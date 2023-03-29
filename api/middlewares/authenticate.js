const { verify } = require('jsonwebtoken');

const { Unauthorized } = require('../miscellaneous/errors');
const { JWT_ACCESS_SECRET } = process.env;

module.exports = async (req, res, next) => {
	const { 'access-token': accessToken } = req.cookies;

	try {
		// Check if there is access-token included in the cookies (logged in)
		if (!accessToken)
			throw new Unauthorized('This action requires logging in first');

		req.user = verify(accessToken, JWT_ACCESS_SECRET);

		next();
	} catch (error) {
		next(error);
	}
};
