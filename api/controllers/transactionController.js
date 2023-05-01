const { create } = require('ipfs-http-client');

const User = require('../models/User');
const Institution = require('../models/Institution');
const Transaction = require('../models/Transaction');

const {
	roles: { INSTITUTION, USER }
} = require('../miscellaneous/constants');
const {
	waitTx,
	contract
} = require('../miscellaneous/transactionUtils');
const {
	MemberNotFound,
	DuplicateEntry,
	NotFound
} = require('../miscellaneous/errors');
const { isString } = require('../miscellaneous/checkInput');
const { genAccessCode } = require('../miscellaneous/generateId');
const Request = require('../models/Request');
const { IPFS_ID, IPFS_SECRET } = process.env;

// Create ipfs instance
const ipfsClient = create({
	host: 'ipfs.infura.io',
	port: 5001,
	protocol: 'https',
	headers: {
		authorization:
			'Basic ' +
			Buffer.from(IPFS_ID + ':' + IPFS_SECRET).toString('base64')
	}
});

const getTransactions = async (req, res, next) => {
	const {
		query: { txHash },
		user: { id, type }
	} = req;

	// Validate input
	isString(txHash, 'Transaction Hash', true);

	// Create transaction query (defaults to user)
	const transactionQuery = {};

	if (type === USER) transactionQuery.user = id;
	if (type === INSTITUTION) transactionQuery.institution = id;

	// Get transactions
	let transactions = await Transaction.find(transactionQuery);

	// Get specific transaction
	if (txHash) {
		transactions = transactions.find(({ hash }) => txHash === hash);

		if (!transactions) throw new NotFound('Transaction not found');
	}

	res.json(transactions);
};

const saveIpfs = async (req, res, next) => {
	const {
		files: {
			document: { mimetype, data }
		},
		body: { requestId },
		user: { id }
	} = req;

	// Check file extension
    console.log(req.files)

	// Upload the document to ipfs but don't pin
	const { path, cid } = await ipfsClient.add({ content: data }, { pin: false });

	// Check if uri minted
	if (await contract.checkUri(cid))
		throw new DuplicateEntry('Document already owned by another user');

    if (requestId) {
        isString(requestId, 'Request ID');

        // Check if the request is existing and paid for by the user
        const request = await Request.findOne({
            requestId,
            institution: id,
            status: 'verified'
        }).select('status details');
        if (!request) throw new NotFound('Request with paid status not found');

        // Update request status to "processing" and add timestamp
        request.status = 'processing';
        request.details.statusTimestamps.processing = new Date();

        // Save changes
        request.markModified('details');
        await request.save();
    }

	// Pin the document
	await ipfsClient.pin.add(cid);

    console.log(path)

	res.status(201).json(path);
};

const updateRecords = (user, hash, request) => {
	// Destructure `member` and `log` properties from `user` object
	const { member, log } = user;
	// Parse `tokenId` from `log` using `contract` interface
	const tokenId = contract.interface.parseLog(log).args.tokenId.toNumber();

	// Update `User` document by pushing a new document object to its `documents` array
	const userUpdate = User.findByIdAndUpdate(
		member,
		{
			$push: {
				documents: {
					nftId: tokenId,
					codes: [genAccessCode()],
					hash
				}
			}
		},
		{ runValidators: true }
	);

	// Update `Transaction` document by setting its `status` property to 'success'
	const transactionUpdate = Transaction.updateOne(
		{ hash },
		{ status: 'success' },
		{ runValidators: true }
	);

	// Create an array of promises to be executed together using `Promise.all()`
	const promises = [userUpdate, transactionUpdate];

	// If `request` object is provided, update `Request` document as well
	if (request) {
		const { requestId, institution } = request;
		const requestUpdate = Request.updateOne(
			{ requestId, institution },
			{
				$set: {
					status: 'completed',
					'details.statusTimestamps.completed': new Date()
				}
			},
			{ runValidators: true }
		);
		// Push `requestUpdate` promise to `promises` array
		promises.push(requestUpdate);
	}

	// Return a promise that resolves when all promises in `promises` array are resolved
	return Promise.all(promises);
};


const saveTransaction = async (req, res, next) => {
	// Extract relevant data from request body and user
	const {
		body: { txHash, walletAddress, requestId },
		user: { id }
	} = req;

    console.log(req.body)

	// Validate inputs
	// Ensure txHash and walletAddress are strings
	isString(txHash, 'Transaction Hash');
	isString(walletAddress, 'Owner Wallet Address');

	// Retrieve institution by ID
	const institution = await Institution.findById(id) // Find the institution with the given ID
		.lean() // Convert the result to a plain JavaScript object
		// Populate institution members with user information
		.populate({ path: 'members.user', select: '-documents' }) // Retrieve user information for each member and exclude the 'documents' field
		// Select only the institution ID and members array
		.select('_id members') // Only retrieve the '_id' and 'members' fields from the institution document
		.exec(); // Execute the query and return a Promise containing the result

	// Check if user is a member of the institution
	const member = institution.members.find(
		({ user }) => user.walletAddress === walletAddress
	);

	// If user is not a member of the institution, throw an error
	if (!member) throw new MemberNotFound();

	// Create new transaction instance
	const transaction = new Transaction({
		hash: txHash,
		institution: id,
		user: member.user._id
	});

	// Save the transaction to the database
	await transaction.save();

	// Wait for the transaction to complete
	await waitTx(
		// Transaction hash to wait for
		txHash,
		// Callback function to execute when transaction is confirmed
		({ logs: [log] }) =>
			updateRecords({ member: member.user._id, log }, txHash, {
				requestId,
				institution: id
			}),
		// If the transaction fails, update the request status to 'paid' and notify the admin of the failure
		async (error) => {
			if (requestId)
				await Request.updateOne(
					{ requestId, institution: id },
					{ $set: { status: 'verified' } },
					{ runValidators: true }
				);

			// Notify admin of transaction failure
		}
	);

	// Send a response to indicate the transaction was successfully saved
	res.status(201).json({ message: 'Transaction saved' });
};

module.exports = { getTransactions, saveIpfs, saveTransaction };
