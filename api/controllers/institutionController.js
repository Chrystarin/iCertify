const {
	utils: { getAddress }
} = require('ethers');

const User = require('../models/User');
const Institution = require('../models/Institution');

const createToken = require('../miscellaneous/createToken');
const verifySignature = require('../miscellaneous/verifySignature');
const { isString } = require('../miscellaneous/checkInput');
const { CustomError } = require('../miscellaneous/errors');
const { INSTITUTION } = require('../miscellaneous/userRoles');

const registerInstitution = async (req, res, next) => {
	const { walletAddress, name } = req.body;

	try {
		// Validate inputs
		isString(walletAddress, 'Wallet Address');
		isString(name, 'Institution Name');

		// Check if wallet address is valid
		walletAddress = getAddress(walletAddress);

		// Check if walletAddress is already registered
		if (
			(await User.findOne({ walletAddress })) ||
			(await Institution.findOne({ walletAddress }))
		)
			throw new CustomError(
				'Duplicate Wallet Address',
				'Wallet address already registered',
				409
			);

		// Create institution
		const institution = await Institution.create({ walletAddress, name });

		res.status(201)
			.cookie(
				'access-token',
				createToken({
					id: institution._id,
					type: INSTITUTION,
					walletAddress
				}),
				{
					httpOnly: true,
					sameSite: 'none',
					secure: true
				}
			)
			.json({ message: 'Institution registered' });
	} catch (error) {
		next(error);
	}
};

const loginInstitution = async (req, res, next) => {
	const { signature, walletAddress } = req.body;

	try {
		// Validate inputs
		isString(signature, 'Signature');
		isString(walletAddress, 'Wallet Address');

		// Find institution
		const institution = await Institution.findOne({ walletAddress });
		if (!institution)
			throw new CustomError('Wallet address not yet registered');

		// Verify the signature
		await verifySignature(signature, walletAddress, Institution);

		res.status(200)
			.cookie(
				'access-token',
				createToken({
					id: institution._id,
					type: INSTITUTION,
					walletAddress
				}),
				{
					httpOnly: true,
					sameSite: 'none',
					secure: true
				}
			)
			.json({ message: 'Institution logged in' });
	} catch (error) {
		next(error);
	}
};

const updateInstitution = async (req, res, next) => {
	const { name } = req.body;

	try {
		// Validate input
		isString(name, 'Institution Name');

		// Find and update institution
		await Institution.findOneAndUpdate(req.user.id, { name });

		res.status(200).json({ message: 'Institution info updated' });
	} catch (error) {
		next(error);
	}
};

const getInstitutions = async (req, res, next) => {
	const { walletAddress } = req.query;

	try {
		// Validate input
		isString(walletAddress, 'Wallet Address', true);

		// Find institutions
		const institutions = await Institution.find(
			walletAddress ? { walletAddress } : {}
		);

		res.status(200).json(institutions);
	} catch (error) {
		next(error);
	}
};

const getMembers = async (req, res, next) => {
	const { walletAddress } = req.query;

	try {
		// Validate input
		isString(walletAddress, 'Wallet Address', true);

		// Find the institution and get the members
		const institution = await Institution.findById(req.user.id).populate(
			'members.user'
		);

		// If walletAddress is given, filter only the member with the same wallet address
		// Otherwise, return all members
		const members = institution.members.filter(({ user }) =>
			walletAddress ? user.walletAddress == walletAddress : true
		);

		res.status(200).json(members);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	registerInstitution,
	loginInstitution,
	updateInstitution,
	getInstitutions,
	getMembers
};