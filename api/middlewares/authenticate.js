const { verify } = require('jsonwebtoken');
const { CustomError } = require('../miscellaneous/errors');

module.exports = async (req, res, next) => {
	const { 'access-token': token } = req.cookies;

	try {
		// Check if there is access-token included in the cookies (logged in)
		if (!token)
			throw new CustomError(
				'Unauthorized Action',
				'This action requires loggin in first',
				401
			);

		// Verify the token
		const { id, type, walletAddress } = verify(
			token,
			process.env.JWT_SECRET
		);

		req.user = { id, type, walletAddress };

		next();
	} catch (error) {
		next(error);
	}
};
