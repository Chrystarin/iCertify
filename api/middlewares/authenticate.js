const { verify } = require('jsonwebtoken');

const {
	cookieOptions,
	duration,
	signAccess,
	signRefresh
} = require('../miscellaneous/tokenUtils');
const { Unauthorized } = require('../miscellaneous/errors');
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

const loginError = new Unauthorized('This action requires logging in first');

module.exports = async (req, res, next) => {
	const { 'access-token': accessToken, 'refresh-token': refreshToken } =
		req.cookies;

	// Check if there is refresh-token included in the cookies (logged in)
	if (!refreshToken) return next(loginError);

	// Check if access-token is valid
	try {
		const { id, type, walletAddress } = verify(
			accessToken,
			JWT_ACCESS_SECRET
		);

		req.user = { id, type, walletAddress };

		return next();
	} catch (error) {}

	// Check if refresh-token is valid
	try {
		const { id, type, walletAddress, createdAt } = verify(
			refreshToken,
			JWT_REFRESH_SECRET
		);

		req.user = { id, type, walletAddress };

		// Create new access-token
		res.cookie('access-token', signAccess(req.user), {
			...cookieOptions,
			maxAge: duration.access
		});

		// Check if refresh-token is almost expired (3 days)
		if (new Date() - new Date(createdAt) < 3 * 24 * 60 * 60 * 1000)
			// Create new refresh-token
			res.cookie('refresh-token', signRefresh(req.user), {
				...cookieOptions,
				maxAge: duration.refresh
			});

		return next();
	} catch (error) {
		// Reset tokens
		res.cookie('access-token', '', { ...cookieOptions, maxAge: 0 }).cookie(
			'refresh-token',
			'',
			{ ...cookieOptions, maxAge: 0 }
		);

		return next(loginError);
	}
};
