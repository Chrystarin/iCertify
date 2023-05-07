const {
	utils: { getAddress }
} = require('ethers');
const { verify } = require('jsonwebtoken');

const User = require('../models/User');
const Institution = require('../models/Institution');

const {
	roles: { USER, INSTITUTION }
} = require('../miscellaneous/constants');
const {
	cookieOptions,
	duration,
	signAccess,
	signRefresh
} = require('../miscellaneous/tokenUtils');
const {
	InvalidInput,
	UserNotFound,
	Unauthorized,
	DuplicateEntry
} = require('../miscellaneous/errors');
const { registerUser } = require('./userController');
const { registerInstitution } = require('./institutionController');
const { isString, isEmail } = require('../miscellaneous/checkInput');
const { JWT_REFRESH_SECRET } = process.env;

const verifySignature = require('../miscellaneous/verifySignature');

const register = async (req, res, next) => {
	// Extract relevant fields from incoming request object
	const { email, userType } = req.body;
	let { walletAddress } = req.body;

	// Validate inputs using helper functions
	isString(walletAddress, 'Wallet Address');
	isString(userType, 'User Type');
	isEmail(email);

	// Check if walletAddress is a valid address
	walletAddress = getAddress(walletAddress);

	// Handle registration for user type
	if (userType === USER) {
		// Check if user with given walletAddress already exists
		if (await User.findOne({ walletAddress }, { walletAddress: 1 })) {
			throw new DuplicateEntry('Email already registered as User');
		}

		// If user does not exist, proceed with user registration
		return registerUser(req, res, next);
	}

	// Handle registration for institution type
	if (userType === INSTITUTION) {
		// Check if institution with given walletAddress exists and has a successful or pending registration transaction
		if (
			await Institution.findOne(
				{ walletAddress, 'transaction.status': { $ne: 'failed' } },
				{ 'transaction.status': 1 }
			)
		) {
			throw new DuplicateEntry(
				'There is a pending or succeeded registration of institution'
			);
		}

		// If institution does not exist or has a failed registration transaction, proceed with institution registration
		return registerInstitution(req, res, next);
	}

	// If user type is invalid, throw an error
	throw new InvalidInput('Invalid user type');
};

const login = async (req, res, next) => {
	const { signature, walletAddress } = req.body;

	// Validate inputs
	isString(signature, 'Signature');
	isString(walletAddress, 'Wallet Address');

	// Verify the signature
	await verifySignature(signature, walletAddress);

	// Check if existing
	const [user, institution] = await Promise.all([
		User.findOne({ walletAddress }),
		Institution.findOne({ walletAddress, 'transaction.status': 'success' })
	]);

	let type;
	let payload;

	switch (true) {
		case user instanceof User:
			type = 'user';
			payload = { id: user._id, type: USER, walletAddress };
			break;
		case institution instanceof Institution:
			type = 'institution';
			payload = {
				id: institution._id,
				type: INSTITUTION,
				walletAddress
			};
			break;
		default:
			throw new UserNotFound();
	}
	res.status(200)
		.cookie('access-token', signAccess(payload), {
			...cookieOptions,
			maxAge: duration.access
		})
		.cookie('refresh-token', signRefresh(payload), {
			...cookieOptions,
			maxAge: duration.refresh
		})
		.json({
			walletAddress,
			type,
			user: user || institution
		});
};

const refresh = async (req, res, next) => {
	const { 'refresh-token': refreshToken } = req.cookies;

	// Check if there is refresh-token included in the cookies (logged in)
	if (!refreshToken)
		throw new Unauthorized('This action requires logging in first');

	// Check if access-token is valid
	const { id, type, walletAddress } = verify(
		refreshToken,
		JWT_REFRESH_SECRET
	);
	const payload = { id, type, walletAddress };

	// Create new access-token
	res.cookie('access-token', signAccess(payload), {
		...cookieOptions,
		maxAge: duration.access
	});

	// Check if refresh-token is almost expired (3 days)
	if (new Date() - new Date(payload.createdAt) < 3 * 24 * 60 * 60 * 1000)
		// Create new refresh-token
		res.cookie('refresh-token', signRefresh(payload), {
			...cookieOptions,
			maxAge: duration.refresh
		});

	res.json({ message: 'Tokens refreshed' });
};

const logout = async (req, res, next) => {
	const { 'refresh-token': refreshToken } = req.cookies;

	// Check if there is refresh-token included in the cookies (logged in)
	if (!refreshToken)
		throw new Unauthorized('This action requires logging in first');

	res.clearCookie('access-token', cookieOptions)
		.clearCookie('refresh-token', cookieOptions)
		.json({ message: `Logged out` });
};

module.exports = { register, login, refresh, logout };
