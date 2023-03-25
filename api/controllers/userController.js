const {
	utils: { getAddress }
} = require('ethers');

const User = require('../models/User');
const Institution = require('../models/Institution');

const {
	signAccess,
	cookieOptions,
	duration,
	signRefresh
} = require('../miscellaneous/tokenUtils');
const {
	roles: { USER }
} = require('../miscellaneous/constants');
const { isString, isEmail, isDate } = require('../miscellaneous/checkInput');
const { DuplicateEntry, UserNotFound } = require('../miscellaneous/errors');
const verifySignature = require('../miscellaneous/verifySignature');

const registerUser = async (req, res, next) => {
	const { walletAddress, firstName, middleName, lastName, email, birthDate } =
		req.body;

	// Validate inputs
	isString(walletAddress, 'Wallet Address');
	isString(firstName, 'First Name');
	isString(middleName, 'Middle Name', true);
	isString(lastName, 'Last Name');
	isEmail(email);
	isDate(birthDate, 'Birth date');

	// Check if walletAddress is a valid address
	walletAddress = getAddress(walletAddress);

	// Check if walletAddress is already registered
	if (
		(await User.findOne({ walletAddress })) ||
		(await Institution.findOne({ walletAddress }))
	)
		throw new DuplicateEntry('Wallet address already registered');

	// Create user
	const user = await User.create({
		walletAddress,
		name: {
			firstName,
			middleName,
			lastName
		},
		email,
		birthDate
	});

	// Payload
	const payload = { id: user._id, type: USER, walletAddress };

	res.status(201)
		.cookie('access-token', signAccess(payload), {
			...cookieOptions,
			maxAge: duration.access
		})
		.cookie('refresh-token', signRefresh(payload), {
			...cookieOptions,
			maxAge: duration.refresh
		})
		.json({ message: 'User registered' });
};

const loginUser = async (req, res, next) => {
	const { signature, walletAddress } = req.body;

	// Validate inputs
	isString(signature, 'Signature');
	isString(walletAddress, 'Wallet Address');

	// Find user
	const user = await User.findOne({ walletAddress });
	if (!user) throw new UserNotFound();

	// Verify the signature
	await verifySignature(signature, walletAddress);

	// Payload
	const payload = { id: user._id, type: USER, walletAddress };

	res.status(200)
		.cookie('access-token', signAccess(payload), {
			...cookieOptions,
			maxAge: duration.access
		})
		.cookie('refresh-token', signRefresh(payload), {
			...cookieOptions,
			maxAge: duration.refresh
		})
		.json({ message: 'User logged in' });
};

const getUser = async (req, res, next) => {
	const walletAddress = req.query?.walletAddress || req.user?.walletAddress;

	// Validate input
	isString(walletAddress, 'Wallet Address');

	// Find user
	const user = await User.findOne({ walletAddress });

	res.status(200).json(user);
};

const updateUser = async (req, res, next) => {
	const {
		firstName,
		middleName,
		lastName,
		email,
		birthDate,
		address,
		contactNo,
		photo,
		about
	} = req.body;

	// Validate inputs
	isString(firstName, 'First Name');
	isString(middleName, 'Middle Name', true);
	isString(lastName, 'Last Name');
	isEmail(email);
	isDate(birthDate, 'Birth date');
	isString(address, 'Address', true);
	isString(contactNo, 'Contact Number', true);
	isString(photo, 'Photo URI', true);
	isString(about, 'About', true);

	// Find user and update user
	await User.findOneAndUpdate(req.user.id, {
		name: { firstName, middleName, lastName },
		email,
		birthDate,
		address,
		contactNo,
		photo,
		about
	});

	res.status(200).json({ message: 'User info updated' });
};

module.exports = { registerUser, loginUser, getUser, updateUser };
