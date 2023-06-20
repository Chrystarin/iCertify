const { isString, isNumber } = require('../miscellaneous/checkInput');
const { NotFound, UserNotFound } = require('../miscellaneous/errors');
const { genAccessCode } = require('../miscellaneous/generateId');
const User = require('../models/User');

const getDocument = async (req, res, next) => {
	// Get the 'code' parameter from the request query
	const { code } = req.query;

	// Validate that 'code' is a string
	isString(code, 'Access Code');

	// Find the user that owns the access code
	// Only return the 'documents' field of the user object
	const user = await User.findOne({ 'documents.codes': code }, 'documents');

	// If no user was found, throw a NotFound error
	if (!user) throw new NotFound('Invalid access code');

	// Get the document associated with the access code
	// Find the document in the user's 'documents' array that has the access code
	const document = user.documents.find(({ codes }) => codes.includes(code));

	// Send the document as a JSON response
	res.json(document);
};

const updateMode = async (req, res, next) => {
	// Extract necessary information from the request body and user object
	const {
		body: { mode, nftId }, // New access mode and NFT ID to update
		user: { id } // User ID
	} = req;

	// Validate that the NFT ID is a number and the access mode is a string
	isNumber(nftId, 'NFT ID');
	isString(mode, 'Access Mode');

	// Update the user's access mode for the specified NFT
	const result = await User.updateOne(
		{
			_id: id, // Find the user by their ID
			'documents.nftId': nftId, // Find the document with matching NFT ID
		},
		{ $set: { 'documents.$.mode': mode } } // Set the access mode to the new value for the matching document
	);

	// If no documents were modified, throw an error
	if (result.modifiedCount === 0) throw new NotFound('Document not found');

	// Send a response indicating the access mode was successfully updated
	res.json({ message: `Access mode updated to ${mode}` });
};

const createAccess = async (req, res, next) => {
	// Destructure nftId and id from req.body and req.user, respectively.
	const {
		body: { nftId },
		user: { id }
	} = req;

	// Check if nftId is a number using the isNumber function.
	isNumber(nftId, 'NFT ID');

	// Generate a new access code using the genAccessCode function.
	const code = genAccessCode();

	// Update the user's documents with a new access code for the specific nftId.
	const result = await User.updateOne(
		{
			_id: id,
			'documents.nftId': nftId
		},
		{ $push: { 'documents.$.codes': code } },
		{ runValidators: true }
	);

	// If the update did not modify any documents, throw a UserNotFound error.
	if (result.modifiedCount === 0) throw new UserNotFound();

	// Return a success response with the new access code.
	res.status(201).json({ message: 'New access code generated', code });
};

const deleteAccess = async (req, res, next) => {
	// Extract the NFT ID and access code from the request body
	const { nftId, code } = req.body;

	// Validate that the NFT ID is a number and the access code is a string
	isNumber(nftId, 'NFT ID');
	isString(code, 'Access Code');

	// Delete the specified access code from the user's document
	const result = await User.updateOne(
		{
			_id: req.user.id, // find the user by their ID
			'documents.nftId': nftId, // find the document with the specified NFT ID
			'documents.codes': code // find the document with the specified access code
		},
		{
			$pull: { 'documents.$.codes': code } // remove the code from the document's codes array
		}
	);

	// If the document was not modified, the user was not found
	if (result.modifiedCount === 0) throw new UserNotFound();

	// Respond with a success message
	res.json({ message: 'Access code deleted' });
};

module.exports = { getDocument, updateMode, createAccess, deleteAccess };
