const { isString, isNumber } = require('../miscellaneous/checkInput');
const {
	NotFound,
	UserNotFound,
	InvalidInput
} = require('../miscellaneous/errors');
const { genAccessCode } = require('../miscellaneous/generateId');
const User = require('../models/User');

const getDocument = async (req, res, next) => {
	const { code } = req.query;

	// Validate input
	isString(code, 'Access Code');

	// Find user that owns the access code
	const user = await User.findOne({
		_id: req.user.id,
		'documents.codes': code
	});
	if (!user) throw new NotFound('Invalid access code');

	// Get the nftId partnered to the code
	const nftId = user.documents.find(({ codes }) => codes.includes(code));

	res.json(nftId);
};

const updateMode = async (req, res, next) => {
	const { mode, nftId } = req.body;

	// Validate input
	isNumber(nftId, 'NFT ID');
	isString(mode, 'Access Mode');

	// Get the user
	const user = await User.findOne({
		_id: req.user.id,
		'documents.nftId': nftId,
		'documents.mode': { $ne: { mode } }
	});
	if (!user) throw new UserNotFound();

	// Update document mode
	user.documents.find(({ nftId: n }) => n === nftId).mode = mode;

	await user.save();

	res.json({ message: `Access mode updated to ${mode}` });
};

const createAccess = async (req, res, next) => {
	const { nftId } = req.body;

	// Validate input
	isNumber(nftId, 'NFT ID');

	// Get the user
	const user = await User.findOne({
		_id: req.user.id,
		'documents.nftId': nftId
	});
	if (!user) throw new UserNotFound();

	// Create new access code
	const code = user.documents
		.find(({ nftId: n }) => n === nftId)
		.codes.push(genAccessCode());
	await user.save();

	res.status(201).json({ message: 'New access code generated', code });
};

const deleteAccess = async (req, res, next) => {
	const { nftId, code } = req.body;

	// Validate input
	isNumber(nftId, 'NFT ID');
	isString(code, 'Access Code');

	// Get the user
	const user = await User.findOne({
		_id: req.user.id,
		'documents.nftId': nftId,
		'documents.codes': code
	});
	if (!user) throw new UserNotFound();

	// Get the document
	const document = user.documents.find(({ nftId: n }) => n === nftId);
	const {
		codes,
		codes: [first]
	} = document;

	// Check if default code is the input
	if (first === code)
		throw new InvalidInput('Can not delete the default access code');

	// Delete access code
	codes.splice(codes.indexOf(code), 1);
	await user.save();

	res.json({ message: 'Access code deleted' });
};

module.exports = { getDocument, updateMode, createAccess, deleteAccess };
