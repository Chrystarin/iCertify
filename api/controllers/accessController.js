const User = require('../models/User');
const Institution = require('../models/Institution');

const { isString } = require('../miscellaneous/checkInput');
const { NotFound } = require('../miscellaneous/errors');

const getDocument = async (req, res, next) => {
	const { accessCode } = req.params;

	// Validate input
	isString(accessCode, 'Access Code');

	// Find user that ownst the access code
	const user = await User.findOne({ 'documents.accessCodes': accessCode });
	if (!user) throw new NotFound('Invalid access code');

	// Get the nftId partnered to the accessCode
	const nftId = user.documents.find(({ accessCodes }) =>
		accessCodes.includes(accessCode)
	);

	res.json(nftId);
};

const getOwner = async (req, res, next) => {
	const { accessCode } = req.params;

	// Validate input
	isString(accessCode, 'Access Code');

	// Find user that ownst the access code
	const user = await User.findOne({
		'documents.accessCodes': accessCode
	})
		.select('-documents')
		.exec();
	if (!user) throw new NotFound('Invalid access code');

	// Get joined institutions of user
	const institutions = await Institution.find({ 'members.user': user._id })
		.select('-members')
		.exec();

	res.json({ ...user, institutions });
};

module.exports = { getDocument, getOwner };
