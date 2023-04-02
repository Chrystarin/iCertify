const { create } = require('ipfs-http-client');

const User = require('../models/User');
const Institution = require('../models/Institution');
const Transaction = require('../models/Transaction');

const {
	roles: { INSTITUTION }
} = require('../miscellaneous/constants');
const { MemberNotFound, DuplicateEntry } = require('../miscellaneous/errors');
const { isString } = require('../miscellaneous/checkInput');
const { waitTx, parseLog } = require('../miscellaneous/waitTransaction');
const calculateHash = require('../miscellaneous/calculateHash');
const { genAccessCode } = require('../miscellaneous/generateId');

const getTransactions = async (req, res, next) => {
	const { walletAddress, txHash } = req.query;

	// Validate input
	isString(txHash, 'Transaction Hash', true);

	// Create transaction query (defaults to user)
	let transactionQuery = { user: req.user.id, hash: txHash };

	// User is institution
	if (req.user.type == INSTITUTION) {
		// Validate input
		isString(walletAddress, 'Wallet Address', true);

		// Find Institution
		const institution = await Institution.findById(req.user.id)
			.populate('members.user')
			.exec();

		// Check if member wallet address is given
		if (walletAddress) {
			// Check if the given wallet address is member of institution
			const member = institution.members.find(
				({ user: { walletAddress: wa } }) => walletAddress === wa
			);
			if (!member) throw new MemberNotFound();

			// Modify transaction query
			transactionQuery = {
				...transactionQuery,
				user: member.user._id
			};
		}

		// Modify transaction query
		transactionQuery = {
			...transactionQuery,
			institution: institution._id
		};
	}

	// Get transactions
	const transactions = await Transaction.find(transactionQuery);

	res.status(200).json(transactions);
};

const saveIpfs = async (req, res, next) => {
	const {
		document: { mimetype, data }
	} = req.files;

	// Calculate hash of image
	const imageHash = await calculateHash(data);

	// Check if image is already saved
	const checkIpfs = await fetch(
		`https://icertify.infura-ipfs.io/ipfs/${imageHash}`
	);
	if (checkIpfs.ok)
		throw new DuplicateEntry('Document already owned by another user');

	// Create ipfs instance
	const ipfsClient = create({
		host: 'ipfs.infura.io',
		port: 5001,
		protocol: 'https',
		headers: {
			authorization:
				'Basic ' +
				Buffer.from(
					process.env.IPFS_ID + ':' + process.env.IPFS_SECRET
				).toString('base64')
		}
	});

	// Upload the image to ipfs
	const ipfsData = await ipfsClient.add({ content: data });

	res.status(201).json({
		message: 'Image uploaded',
		cid: ipfsData.cid
	});
};

const saveTransaction = async (req, res, next) => {
	const { txHash, walletAddress } = req.body;

	// Validate inputs
	isString(txHash, 'Transaction Hash');
	isString(walletAddress, 'Owner Wallet Address');

	// Get the institution
	const institution = await Institution.findById(req.user.id)
		.populate('members.user')
		.exec();

	// Check if user is member of institution
	const member = institution.members.find(
		({ user: { walletAddress: wa } }) => wa == institution.walletAddress
	);
	if (!member) throw new MemberNotFound();

	// Wait for transaction
	await waitTx(txHash, ({ logs: [log] }) =>
		// Add record to documents owned by user
		User.findByIdAndUpdate(
			member.user._id,
			{
				$push: {
					documents: {
						nftId: parseLog(log).args.tokenId.toNumber(),
						codes: [genAccessCode()]
					}
				}
			},
			{ new: true }
		)
	);

	// Create transaction
	await Transaction.create({
		hash: txHash,
		institution: institution._id,
		user: member.user._id
	});

	res.status(201).json({ message: 'Transaction saved' });
};

module.exports = { getTransactions, saveIpfs, saveTransaction };
