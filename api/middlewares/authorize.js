const { CustomError } = require('../miscellaneous/errors');
const { USER, INSTITUTION } = require('../miscellaneous/userRoles');

const onlyUser = async (req, res, next) => {
	if (req.user?.type == USER) return next();

	next(
		new CustomError(
			'Unauthorized Action',
			'This action is exclusive for users only',
			401
		)
	);
};

const onlyInstitution = async (req, res, next) => {
	if (req.user?.type == INSTITUTION) return next();

	next(
		new CustomError(
			'Unauthorized Action',
			'This action is exclusive for institutions only',
			401
		)
	);
};

module.exports = {
	onlyUser,
    onlyInstitution
};
