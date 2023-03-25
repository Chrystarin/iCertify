const { Forbidden } = require('../miscellaneous/errors');
const {
	roles: { USER, INSTITUTION }
} = require('../miscellaneous/constants');

const onlyUser = async (req, res, next) => {
	if (req.user?.type == USER) return next();
	next(new Forbidden('This action is exclusive for users only'));
};

const onlyInstitution = async (req, res, next) => {
	if (req.user?.type == INSTITUTION) return next();
	next(new Forbidden('This action is exclusive for institutions only'));
};

module.exports = { onlyUser, onlyInstitution };
