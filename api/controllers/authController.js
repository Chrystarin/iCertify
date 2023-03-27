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
	DuplicateEntry,
	InvalidInput,
	UserNotFound,
	InstitutionNotFound,
	Unauthorized
} = require('../miscellaneous/errors');
const { registerUser } = require('./userController');
const { registerInstitution } = require('./institutionController');
const { isString, isEmail } = require('../miscellaneous/checkInput');
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

const verifySignature = require('../miscellaneous/verifySignature');

const register = async (req, res, next) => {
	const { walletAddress, email, userType } = req.body;

	// Validate inputs
	isString(walletAddress, 'Wallet Address');
	isString(userType, 'User Type');
	isEmail(email);

	// Check if walletAddress is a valid address
	walletAddress = getAddress(walletAddress);

	// Check if walletAddress is already registered
	if (
		(await User.findOne({ walletAddress })) ||
		(await Institution.findOne({ walletAddress }))
	)
		throw new DuplicateEntry('Wallet address already registered');

	// Check if email is already registered
	if (
		(await User.findOne({ email })) ||
		(await Institution.findOne({ email }))
	)
		throw new DuplicateEntry('Email already registered');

	if (userType === USER) return registerUser(req, res, next);

	if (userType === INSTITUTION) return registerInstitution(req, res, next);

	// Invalid type
	throw new InvalidInput('Invalid user type');
};

const login = async (req, res, next) => {
	const { signature, walletAddress, userType } = req.body;

	// Validate inputs
	isString(signature, 'Signature');
	isString(walletAddress, 'Wallet Address');
	isString(userType, 'User Type');

	// Verify the signature
	await verifySignature(signature, walletAddress);

	// Create payload holder
	let payload;

	// Find user
	if (userType === USER) {
		const user = await User.findOne({ walletAddress });
		if (!user) throw new UserNotFound();

		payload = { id: user._id, type: USER, walletAddress };
	}

	// Find institution
	if (userType === INSTITUTION) {
		const institution = await Institution.findOne({ walletAddress });
		if (!institution) throw new InstitutionNotFound();

		payload = {
			id: institution._id,
			type: INSTITUTION,
			walletAddress
		};
	}

	// Invalid type
	if (!payload) throw new InvalidInput('Invalid user type');

	res.status(200)
		.cookie('access-token', signAccess(payload), {
			...cookieOptions,
			maxAge: duration.access
		})
		.cookie('refresh-token', signRefresh(payload), {
			...cookieOptions,
			maxAge: duration.refresh
		})
		.json({ message: `${userType} logged in` });
};

const refresh = async (req, res, next) => {
	const { 'refresh-token': refreshToken } = req.cookies;

	// Check if there is refresh-token included in the cookies (logged in)
	if (!refreshToken)
		throw new Unauthorized('This action requires logging in first');

	// Check if access-token is valid
	const payload = verify(refreshToken, JWT_REFRESH_SECRET);

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

	res.send();
};

const logout = async (req, res, next) => {
	const { 'refresh-token': refreshToken } = req.cookies;

	// Check if there is refresh-token included in the cookies (logged in)
	if (!refreshToken)
		throw new Unauthorized('This action requires logging in first');

	res.status(200)
		.cookie('access-token', '', { ...cookieOptions, maxAge: 0 })
		.cookie('refresh-token', '', { ...cookieOptions, maxAge: 0 })
		.json({ message: `${userType} logged out` });
};

module.exports = { register, login, refresh, logout };
