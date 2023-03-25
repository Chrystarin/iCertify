const {
	utils: { getAddress }
} = require('ethers');

const User = require('../models/User');
const Institution = require('../models/Institution');

const {
	signAccess,
	cookieOptions,
	duration,
	signRefresh
} = require('../miscellaneous/tokenUtils');
const {
	DuplicateEntry,
	InstitutionNotFound
} = require('../miscellaneous/errors');
const {
	isString,
	isNumber,
	isEmail,
	isBoolean
} = require('../miscellaneous/checkInput');
const {
	roles: { INSTITUTION, USER }
} = require('../miscellaneous/constants');
const { genDocId } = require('../miscellaneous/generateId');
const verifySignature = require('../miscellaneous/verifySignature');
const waitTransaction = require('../miscellaneous/waitTransaction');

const registerInstitution = async (req, res, next) => {
	const { walletAddress, txHash, name, email, type } = req.body;

	// Validate inputs
	isString(walletAddress, 'Wallet Address');
	isString(txHash, 'Transaction Hash');
	isString(name, 'Institution Name');
	isEmail(email);
	isString(type, 'Institution Type');

	// Check if wallet address is valid
	walletAddress = getAddress(walletAddress);

	// Check if walletAddress is already registered
	if (
		(await User.findOne({ walletAddress })) ||
		(await Institution.findOne({ walletAddress }))
	)
		throw new DuplicateEntry('Wallet address already registered');

	// Wait for transaction to be mined
	await waitTransaction(
		txHash,
		Institution.create({ walletAddress, name, email, instType: type })
	);

	res.status(201).json({
		message: 'Institution registration waitinng to be mined'
	});
};

const loginInstitution = async (req, res, next) => {
	const { signature, walletAddress } = req.body;

	// Validate inputs
	isString(signature, 'Signature');
	isString(walletAddress, 'Wallet Address');

	// Find institution
	const institution = await Institution.findOne({ walletAddress });
	if (!institution) throw new InstitutionNotFound();

	// Verify the signature
	await verifySignature(signature, walletAddress);

	// Payload
	const payload = {
		id: institution._id,
		type: INSTITUTION,
		walletAddress
	};

	res.status(200)
		.cookie('access-token', signAccess(payload), {
			...cookieOptions,
			maxAge: duration.access
		})
		.cookie('refresh-token', signRefresh(payload), {
			...cookieOptions,
			maxAge: duration.refresh
		})
		.json({ message: 'Institution logged in' });
};

const updateInstitution = async (req, res, next) => {
	const {
		name,
		type,
		email,
		about,
		address,
		website,
		contactNo,
		profileURI,
		coverURI,
		needId,
		needMembership
	} = req.body;

	// Validate input
	isString(name, 'Institution Name');
	isString(type, 'Institution Type');
	isEmail(email);
	isBoolean(needId, 'Need ID');
	isBoolean(needMembership, 'Need Membership');
	isString(about, 'About', true);
	isString(address, 'Address', true);
	isString(website, 'Website', true);
	isString(contactNo, 'Contract Number', true);
	isString(profileURI, 'Profile URI', true);
	isString(coverURI, 'Cover URI', true);

	// Find and update institution
	await Institution.findOneAndUpdate(req.user.id, {
		name,
		instType: type,
		email,
		about,
		address,
		website,
		contactNo,
		photos: { profile: profileURI, cover: coverURI },
		needs: { ID: needId, membership: needMembership }
	});

	res.status(200).json({ message: 'Institution info updated' });
};

const getInstitutions = async (req, res, next) => {
	const { walletAddress } = req.query;

	// Validate input
	isString(walletAddress, 'Wallet Address', true);

	// Find institutions
	const institutions = await Institution.find(
		walletAddress ? { walletAddress } : {}
	)
		.populate('-members')
		.exec();

	res.status(200).json(institutions);
};

const getMembers = async (req, res, next) => {
	const { walletAddress } = req.query;

	// Validate input
	isString(walletAddress, 'Wallet Address', true);

	// Find the institution and get the members
	const institution = await Institution.findById(req.user.id)
		.populate('members.user')
		.exec();

	// If walletAddress is given, filter only the member with the same wallet address
	// Otherwise, return all members
	const members = institution.members.filter(
		({ user: { walletAddress: wa } }) =>
			walletAddress ? wa === walletAddress : true
	);

	res.status(200).json(members);
};

const addOfferedDoc = async (req, res, next) => {
	const { title, description, price, requirements } = req.body;

	isString(title, 'Title');
	isString(description, 'Description');
	isNumber(price, 'Price');
	isString(requirements, 'Requirements');

	// Get institution and update
	await Institution.findByIdAndUpdate(req.user.id, {
		$push: {
			docOffers: {
				docId: genDocId(),
				title,
				description,
				price,
				requirements
			}
		}
	});

	res.status(201).json({ message: 'Offer saved' });
};

const getOfferedDocs = async (req, res, next) => {
	const { walletAddress } = req.query;

	// Default institution
	let institution = await Institution.findById(req.user.id);

	if (req.user.type === USER) {
		isString(walletAddress, 'Institution Wallet Address');

		// Find institution
		institution = await Institution.findOne({ walletAddress });
		if (!institution) throw new InstitutionNotFound();
	}

	res.status(200).json(institution.docOffers);
};

module.exports = {
	registerInstitution,
	loginInstitution,
	updateInstitution,
	getInstitutions,
	getMembers,
	addOfferedDoc,
	getOfferedDocs
};
