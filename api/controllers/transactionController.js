const { create } = require('ipfs-http-client');

const User = require('../models/User');
const Institution = require('../models/Institution');
const Transaction = require('../models/Transaction');

const {
	roles: { INSTITUTION, USER }
} = require('../miscellaneous/constants');
const {
	waitTx,
	parseLog,
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
	const { walletAddress, txHash } = req.query;

	// Validate input
	isString(txHash, 'Transaction Hash', true);

	// Create transaction query (defaults to user)
	let transactionQuery = {};

	if (req.user.type == USER) transactionQuery.user = req.user.id;

	if (req.user.type == INSTITUTION) {
		isString(walletAddress, 'Wallet Address', true);

		// Find Institution
		const institution = await Institution.findById(req.user.id)
			.populate('members.user')
			.exec();

		// Check if member wallet address is given
		if (walletAddress) {
			// Check if the given wallet address is member of institution
			const member = institution.members.find(
				({ user: { walletAddress: wa } }) => walletAddress == wa
			);
			if (!member) throw new MemberNotFound();

			// Add user to query
			transactionQuery.user = member.user._id;
		}

		// Add institution to query
		transactionQuery.institution = institution._id;
	}

	// Get transactions
	const transactions = await Transaction.find(transactionQuery);

	// Get specific transaction
	if (txHash)
		transactions = transactions.find(({ hash }) =>
			txHash ? txHash == hash : true
		);

	res.json(transactions);
};

const saveIpfs = async (req, res, next) => {
	const {
		document: { mimetype, data }
	} = req.files;
	const { requestId } = req.body;
	const { id } = req.user;

	// Upload the document to ipfs but don't pin
	const { cid } = await ipfsClient.add({ content: data }, { pin: false });

	// Check if uri minted
	if (await contract.checkUri(cid))
		throw new DuplicateEntry('Document already owned by another user');

	// Check if request is existing
	const request = await Request.findOne({
		requestId,
		institution: id,
		status: 'paid'
	});
	if (!request) throw new NotFound('Request with paid status not found');

	// Update request status
	request.status = 'processing';
	await request.save();

	// Pin the document
	await ipfsClient.pin.add(cid);

	res.status(201).json({ message: 'Image uploaded', cid, requestId });
};

const saveTransaction = async (req, res, next) => {
	const { txHash, walletAddress, requestId } = req.body;
	const { id } = req.user;

	// Validate inputs
	isString(txHash, 'Transaction Hash');
	isString(walletAddress, 'Owner Wallet Address');

	// Get the institution
	const institution = await Institution.findById(id)
		.populate('members.user')
		.exec();

	// Check if user is member of institution
	const member = institution.members.find(
		({ user: { walletAddress: wa } }) => wa == institution.walletAddress
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
							nftId: parseLog(log).args.tokenId.toNumber(),
							codes: [genAccessCode()]
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
				{ $set: { status: 'completed' } },
				{ runValidators: true }
			);
		},
		async (error) => {
			// Update request back to paid
			await Request.findOneAndUpdate(
				{ requestId, institution: id },
				{ $set: { status: 'paid' } },
				{ runValidators: true }
			);

            // Notify admin failed transaction
		}
	);

	res.status(201).json({ message: 'Transaction saved' });
};

module.exports = { getTransactions, saveIpfs, saveTransaction };
