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

// This function registers a new user
const registerUser = async (req, res, next) => {
	// Destructure the necessary properties from the request body
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

	// Create user with the provided inputs
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

	// Create a payload containing the user's information
	const payload = { id: user._id, type: USER, walletAddress };

	// Send a response to the client
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
	// Destructure the walletAddress and access-token cookie from the request object
	const {
		query: { walletAddress },
		cookies: { 'access-token': token }
	} = req;

	// Validate that the walletAddress is a string
	isString(walletAddress, 'Wallet Address');

	// Find the user in the database based on their wallet address
	const user = await User.findOne({ walletAddress }).lean().exec();

	// If user not found, return a 404 status and message
	if (!user) return res.status(404).json({ message: 'User not found' });

	let id;

	try {
		// Check if the request has an access-token cookie
		if (token) {
			// If so, verify the token and extract the user ID
			({ id } = verify(token, JWT_ACCESS_SECRET));
		}
	} finally {
		// Do nothing if there's an error in the try block
	}

	// If the user ID is not present or does not match the retrieved user's ID
	if (!id || !user._id.equals(id)) {
		// Remove the user's private documents from the response
		user.documents = user.documents
			.filter(({ mode }) => mode === 'public') // Filter only the public documents
			.map(({ codes: [code], ...rest }) => ({ ...rest, code })); // Map to only the default access code
	}

	// Retrieve the institutions that the user is a member of
	const institutions = await Institution.find({ 'members.user': user._id })
		.lean()
		.select('-members') // Exclude the members field from the response
		.exec();

	// Return the user's data and institutions in the response
	res.json({ ...user, institutions });
};

const updateUser = async (req, res, next) => {
	// Destructure relevant data from request object
	const {
		body: { body }, // Request body
		user: { id }, // User ID from auth middleware
		files // Uploaded files
	} = req;

    console.log(req.body)

	// Destructure user data from request body
	const {
		firstName,
		middleName,
		lastName,
		email,
		birthDate,
		address,
		contactNo,
		about
	} = JSON.parse(body);

	// Validate inputs using helper functions
	isString(firstName, 'First Name');
	isString(middleName, 'Middle Name', true); // Optional middle name
	isString(lastName, 'Last Name');
	isEmail(email);
	isDate(birthDate, 'Birth date');
	isString(address, 'Address', true); // Optional address
	isString(contactNo, 'Contact Number', true); // Optional contact number
	isString(about, 'About', true); // Optional "about" text

	// Get user from database
	const user = await User.findById(id);

	// Update user data with values from request body
	user.name.firstName = firstName;
	user.name.middleName = middleName;
	user.name.lastName = lastName;
	user.email = email;
	user.birthDate = birthDate;
	user.address = address;
	user.contactNo = contactNo;
	user.about = about;

	// If a photo was uploaded, add it to the user's profile
	const photo = files?.photo; // Optional photo file
	if (photo)
		user.photo = await uploadImage(
			photo,
			`profiles/${user.walletAddress}-profile`
		);

	// Save changes to user data in database
	await user.save();

	// Send response back to client
	res.json({ message: 'User info updated' });
};

module.exports = { registerUser, getUser, updateUser };
