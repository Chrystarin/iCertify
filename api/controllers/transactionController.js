const { create } = require('ipfs-http-client');
const {
	utils: { Interface },
	providers: { JsonRpcProvider }
} = require('ethers');

const User = require('../models/User');
const Institution = require('../models/Institution');
const Transaction = require('../models/Transaction');

const { CustomError } = require('../miscellaneous/errors');
const calculateHash = require('../miscellaneous/calculateHash');
const { INSTITUTION } = require('../miscellaneous/userRoles');

const { abi } = require('../build/contracts/CertificateNFT.json');
const { isString } = require('../miscellaneous/checkInput');
const provider = new JsonRpcProvider(process.env.TEST_PROVIDER + ':7545');
const interface = new Interface(abi);

const getTransactions = async (req, res, next) => {
	const { walletAddress, txHash } = req.query;

	try {
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
				if (!member)
					throw new CustomError(
						'Member Not Found',
						'There is no such member with that wallet address',
						404
					);

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
	} catch (error) {
		next(error);
	}
};

const saveIpfs = async (req, res, next) => {
	try {
		const {
			certificate: { mimetype, data }
		} = req.files;

		// Calculate hash of image
		const imageHash = await calculateHash(data);

		// Check if image is already saved
		const checkIpfs = await fetch(
			`https://icertify.infura-ipfs.io/ipfs/${imageHash}`
		);
		if (checkIpfs.ok)
			throw new CustomError(
				'Duplicate Document',
				'Image already minted and owned by another user',
				409
			);

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
	} catch (error) {
		next(error);
	}
};

const saveTransaction = async (req, res, next) => {
	const { txHash, ownerAddress } = req.body;

	try {
		// Validate inputs
		isString(txHash, 'Transaction Hash');
		isString(ownerAddress, 'Owner Wallet Address');

		// Get the institution
		const institution = await Institution.findById(req.user.id)
			.populate('members.user')
			.exec();

		// Check if user is member of institution
		const member = institution.members.find(
			({ user: { walletAddress } }) =>
				walletAddress == institution.walletAddress
		);
		if (!member)
			throw new CustomError(
				'Member Not Found',
				'There is no such member with that wallet address',
				404
			);

		// Check if transaction is valid
		const transaction = await provider.getTransaction(txHash);
		if (!transaction)
			throw new CustomError(
				'Invalid Transaction',
				'Transaction Hash is not existing',
				404
			);

		// Create transaction
		await Transaction.create({
			hash: txHash,
			institution: institution._id,
			user: member.user._id
		});

		// Monitor transaction (async)
		transaction
			.wait()
			.then(({ logs: [log] }) =>
				// Add record to documents owned by user
				User.findByIdAndUpdate(
					member._id,
					{
						$push: {
							documents: {
								nftId: interface
									.parseLog(log)
									.args.tokenId.toNumber()
							}
						}
					},
					{ new: true }
				)
			)
			.then(({ walletAddress }) =>
				console.log('Document saved.', walletAddress)
			);

		res.status(201).json({ message: 'Transaction saved' });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getTransactions,
	saveIpfs,
	saveTransaction
};
