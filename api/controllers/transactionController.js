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

	// Upload the document to ipfs but don't pin
	const { path, cid } = await ipfsClient.add({ content: data }, { pin: false });

	// Check if uri minted
	if (await contract.checkUri(cid))
		throw new DuplicateEntry('Document already owned by another user');

	// Check if request is existing
	const request = await Request.findOne({
		requestId,
		institution: id,
		status: 'verified'
	});
	if (!request) throw new NotFound('Request with paid status not found');

	// Update request status
	request.status = 'processing';
	request.details.statusTimestamps.processing = new Date();

	// Save changes
	request.markModified('details');
	await request.save();


	// Pin the document
	await ipfsClient.pin.add(cid);

	res.status(201).json(path);
};

const saveTransaction = async (req, res, next) => {
	const {
		body: { txHash, walletAddress, requestId },
		user: { id }
	} = req;

	// Validate inputs
	isString(txHash, 'Transaction Hash');
	isString(walletAddress, 'Owner Wallet Address');

	// Get the institution
	const institution = await Institution.findById(id)
		.lean()
		.populate('members.user')
		.exec();

	// Check if user is member of institution
	const member = institution.members.find(
		({ user: { walletAddress: wa } }) => wa == walletAddress
	);
	if (!member) throw new MemberNotFound();

	// Create transaction instance
	const transaction = new Transaction({
		hash: txHash,
		institution: institution._id,
		user: member.user._id
	});

	// Save transaction
	await transaction.save();

	// Wait for transaction
	await waitTx(
		txHash,
		async ({ logs: [log] }) => {
			// Add record to documents owned by user
			await User.findByIdAndUpdate(
				member.user._id,
				{
					$push: {
						documents: {
							nftId: contract.interface.parseLog(log).args.tokenId.toNumber(),
							codes: [genAccessCode()],
                            hash: txHash
						}
					}
				},
				{ runValidators: true }
			);

			// Update transaction
			await Transaction.findOneAndUpdate(
				{ txHash },
				{ status: 'success' },
				{ runValidators: true }
			);

			// Update request to completed
			await Request.findOneAndUpdate(
				{ requestId, institution: id },
				{
					$set: {
						status: 'completed',
						details: { statusTimestamps: { completed: new Date() } }
					}
				},
				{ runValidators: true }
			);
		},
		async (error) => {
			console.log(error);

			// Update request back to paid
			await Request.findOneAndUpdate(
				{ requestId, institution: id },
				{ $set: { status: 'verified' } },
				{ runValidators: true }
			);

			// Notify admin failed transaction
		}
	);

	res.status(201).json({ message: 'Transaction saved' });
};

module.exports = { getTransactions, saveIpfs, saveTransaction };
