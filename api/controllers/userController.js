const {
	utils: { getAddress }
} = require('ethers');

const User = require('../models/User');
const Institution = require('../models/Institution');

const createToken = require('../miscellaneous/createToken');
const { isString } = require('../miscellaneous/checkInput');
const { CustomError } = require('../miscellaneous/errors');
const verifySignature = require('../miscellaneous/verifySignature');

const registerUser = async (req, res, next) => {
	const { walletAddress, firstName, lastName, extension, about } = req.body;

	try {
		// Validate inputs
		isString(walletAddress, 'Wallet Address');
		isString(firstName, 'First Name');
		isString(lastName, 'Last Name');
		isString(extension, 'Name Extension', true);
		isString(about, 'About', true);

		// Check if walletAddress is a valid address
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

		// Create user
		const user = await User.create({
			walletAddress,
			name: {
				firstName,
				lastName,
				extension
			},
			about
		});

		res.status(201)
			.cookie(
				'access-token',
				createToken({
					id: user._id,
					type: 'user',
					walletAddress
				}),
				{
					httpOnly: true,
					sameSite: 'none',
					secure: true
				}
			)
			.json({ message: 'User registered' });
	} catch (error) {
		next(error);
	}
};

const loginUser = async (req, res, next) => {
	const { signature, walletAddress } = req.body;

	try {
		// Validate inputs
		isString(signature, 'Signature');
		isString(walletAddress, 'Wallet Address');

		// Find user
		const user = await User.findOne({ walletAddress });
		if (!user) throw new CustomError('Wallet address not yet registered');

		// Verify the signature
		await verifySignature(signature, walletAddress, User);

		res.status(200)
			.cookie(
				'access-token',
				createToken({
					id: user._id,
					type: 'user',
					walletAddress
				}),
				{
					httpOnly: true,
					sameSite: 'none',
					secure: true
				}
			)
			.json({ message: 'User logged in' });
	} catch (error) {
		next(error);
	}
};

const getUser = async (req, res, next) => {
	const walletAddress = req.query?.walletAddress || req.user?.walletAddress;

	try {
		// Validate input
		isString(walletAddress, 'Wallet Address');

		// Find users
		const user = await User.findOne({ walletAddress });

		res.status(200).json(user);
	} catch {}
};

const updateUser = async (req, res, next) => {
	const { firstName, lastName, extension, about } = req.body;

	try {
		// Validate inputs
		isString(firstName, 'First Name');
		isString(lastName, 'Last Name');
		isString(extension, 'Name Extension', true);
		isString(about, 'About', true);

		// Find user and update user
		await User.findOneAndUpdate(req.user.id, {
			firstName,
			lastName,
			extension,
			about
		});

		res.status(200).json({ message: 'User info updated' });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	registerUser,
	getUser,
	updateUser,
	loginUser
};
