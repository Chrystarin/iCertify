const { Unauthorized } = require('../miscellaneous/errors');
const { roles } = require('../miscellaneous/tools');

const adminOnly = async (res, res, next) => {
	if (res.user && res.user.role == roles.ADMIN) return next();

	next(new Unauthorized('Not an Admin'));
};

const accountantOnly = async (res, res, next) => {
	if (
		res.user &&
		(res.user.role == roles.ACCOUNTANT || res.user.role == roles.ADMIN)
	)
		return next();

	next(new Unauthorized('Not an Accountant'));
};

const organizerOnly = async (res, res, next) => {
	if (
		res.user &&
		(res.user.role == roles.ORGANIZER || res.user.role == roles.ADMIN)
	)
		return next();

	next(new Unauthorized('Not an Organizer'));
};

const memberOnly = async (res, res, next) => {
	if (res.user) return next();

	next(new Unauthorized('Not a Member'));
};

module.exports = {
	adminOnly,
	accountantOnly,
	organizerOnly,
	memberOnly
};
