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

const registerUser = async (req, res, next) => {
	const {
		body: {
			walletAddress,
			email,
			details: { firstName, middleName, lastName, birthDate }
		}
	} = req;

	// Validate inputs
	isString(firstName, 'First Name');
	isString(middleName, 'Middle Name', true);
	isString(lastName, 'Last Name');
	isDate(birthDate, 'Birth date');

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

const getUser = async (req, res, next) => {
	const {
		query: { walletAddress },
		user: { type }
	} = req;

	// Validate input
	isString(walletAddress, 'Wallet Address');

	// Find user
	const user = await User.findOne({ walletAddress }).lean().exec();

	// Remove the private documents if user is not itself
	if (type !== USER)
		user.documents = user.documents
			// Filter only the public documents
			.filter(({ mode }) => mode === 'public')
			// Return only the default access code
			.map(({ codes: [code], ...rest }) => ({ ...rest, code }));

	// Get joined institutions
	const institutions = await Institution.find({ 'members.user': user._id })
		.lean()
		.select('-members')
		.exec();

	res.json({ ...user, institutions });
};

const updateUser = async (req, res, next) => {
	const {
		body: {
			firstName,
			middleName,
			lastName,
			email,
			birthDate,
			address,
			contactNo,
			photo,
			about
		}
	} = req;

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

	res.json({ message: 'User info updated' });
};

module.exports = { registerUser, getUser, updateUser };
