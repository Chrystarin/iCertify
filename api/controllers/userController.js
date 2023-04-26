const { verify } = require('jsonwebtoken');

const User = require('../models/User');
const Institution = require('../models/Institution');

const {
	cookieOptions,
	duration,
	signAccess,
	signRefresh
} = require('../miscellaneous/tokenUtils');
const {
	roles: { USER }
} = require('../miscellaneous/constants');
const { isString, isEmail, isDate } = require('../miscellaneous/checkInput');
const { JWT_ACCESS_SECRET } = process.env;
const uploadImage = require('../miscellaneous/uploadImage');

const registerUser = async (req, res, next) => {
	const {
		walletAddress,
		email,
		details: { firstName, middleName, lastName, birthDate }
	} = req.body;

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
		cookies: { 'access-token': token }
	} = req;

	// Validate input
	isString(walletAddress, 'Wallet Address');

	// Find user
	const user = await User.findOne({ walletAddress }).lean().exec();

	let id;

	// Check if request hast access-token cookie
	// If so, extract the id
	if (token) ({ id } = verify(token, JWT_ACCESS_SECRET));

	// Remove the private documents if user is not itself
	if (id && !user._id.equals(id))
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
		body: { body },
		user: { id },
		files
	} = req;

    const {
        firstName,
        middleName,
        lastName,
        email,
        birthDate,
        address,
        contactNo,
        about
    } = JSON.parse(body)
    
    console.log(req.body.body)

	// Validate inputs
	isString(firstName, 'First Name');
	isString(middleName, 'Middle Name', true);
	isString(lastName, 'Last Name');
	isEmail(email);
	isDate(birthDate, 'Birth date');
	isString(address, 'Address', true);
	isString(contactNo, 'Contact Number', true);
	isString(about, 'About', true);

	// Get user
	const user = await User.findById(id);

	user.name.firstName = firstName;
	user.name.middleName = middleName;
	user.name.lastName = lastName;
	user.email = email;
	user.birthDate = birthDate;
	user.contactNo = contactNo;
	user.about = about;

	// Add photo to params if it is given
	const photo = files?.photo;
	if (photo)
		user.photo = await uploadImage(
			photo,
			`profiles/${user.walletAddress}-profile`
		);
	
	// Save changes
	await user.save();

	res.json({ message: 'User info updated' });
};

module.exports = { registerUser, getUser, updateUser };
