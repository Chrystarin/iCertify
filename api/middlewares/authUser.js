const jwt = require('jsonwebtoken');
const Member = require('../models/Member');
const Accountant = require('../models/Accountant');
const { roles } = require('../miscellaneous/tools');
const { NotFound, Unauthorized } = require('../miscellaneous/errors');

const ADMIN_WALLET_ADDRESS = '0x0';

module.exports = async (req, res, next) => {
	const { 'access-token': token } = req.cookies;
	if (!token) return next();

	try {
		// Verify token
		const { id, walletAddress } = jwt.verify(token, process.env.JWT_SECRET);

		// Admin
		if (walletAddress === ADMIN_WALLET_ADDRESS) {
			req.user = roles.ADMIN;
			return next();
		}

		// Find member
		const member = await Member.findById(id).exec();

		// Not existing
		if (!member) throw new NotFound('Member');

		// Accountant
		if (await Accountant.findOne({ member: id }).exec()) {
			req.user = roles.ACCOUNTANT;
			return next();
		}

		// Organizer
		if (
			member.joinedEvents.filter(({ role }) => role === roles.ORGANIZER)
				.length > 0
		) {
			req.user = roles.ORGANIZER;
			return next();
		}

		// Member
		req.user = roles.MEMBER;
		next();
	} catch (error) {
		if (error.name === 'TokenExpiredError')
			return next(new Unauthorized('Token expired'));
		next(error);
	}
};
