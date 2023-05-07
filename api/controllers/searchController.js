const { isString } = require('../miscellaneous/checkInput');
const Institution = require('../models/Institution');
const User = require('../models/User');

const search = async (req, res, next) => {
	// Get the 'name' query parameter from the request object
	const { name } = req.query;

	// Ensure that 'name' is a string
	isString(name, 'Name');

	// Create a regex object with case-insensitive search
	const regex = { $regex: name, $options: 'i' };

	// Find institutions with matching name and project only their wallet address, name, and photos
	const institutionsSearch = Institution.find(
		{ name: regex },
		{ walletAddress: 1, name: 1, photos: 1 }
	).lean();

	// Find users with matching first name, middle name, or last name, and project only their wallet address, name, and photo
	const usersSearch = User.find(
		{
			$or: [
				{ 'name.firstName': regex },
				{ 'name.middleName': regex },
				{ 'name.lastName': regex }
			]
		},
		{ walletAddress: 1, name: 1, photo: 1 }
	).lean();

	// Wait for both institution and user searches to complete
	const [institutions, users] = await Promise.all([
		institutionsSearch,
		usersSearch
	]);

	// Combine the results from both searches, adding a 'type' field to differentiate between institutions and users
	const results = [
		...institutions.map((i) => ({ ...i, type: 'institution' })),
		...users.map((u) => ({ ...u, type: 'user' }))
	];

	// Send the results as a JSON response
	res.json(results);
};

module.exports = { search };
