const jwt = require('jsonwebtoken');
const Member = require('../models/Member');
const Accountant = require('../models/Accountant');
const { roles } = require('../miscellaneous/tools');
const { NotFound, Unauthorized } = require('../miscellaneous/errors');

const ADMIN_WALLET_ADDRESS = '0x0';

module.exports = async (req, res, next) => {
	const { 'access-token': token } = req.cookies;
	if (!token) return next();

	req.user = {};

	try {
		// Verify token
		const { id, walletAddress } = jwt.verify(token, process.env.JWT_SECRET);
		req.user.walletAddress = walletAddress;

		// Admin
		if (walletAddress === ADMIN_WALLET_ADDRESS) {
			req.user.role = roles.ADMIN;
			return next();
		}

		// Find member
		const member = await Member.findById(id).exec();

		// Accountant
		if (await Accountant.findOne({ member: id }).exec()) {
			req.user.role = roles.ACCOUNTANT;
			return next();
		}

		// Organizer
		if (
			member.joinedEvents &&
			member.joinedEvents.some((e) => e.role === roles.ORGANIZER)
		) {
			req.user.role = roles.ORGANIZER;
			return next();
		}

		// Member
		req.user.role = roles.MEMBER;
		next();
	} catch (error) {
		if (error.name === 'TokenExpiredError')
			return next(new Unauthorized('Token expired'));
		next(error);
	}
};
