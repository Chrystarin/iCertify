const Institution = require('../models/Institution');

const {
	isString,
	isNumber,
	isEmail,
	isBoolean
} = require('../miscellaneous/checkInput');
const {
	roles: { USER, INSTITUTION }
} = require('../miscellaneous/constants');
const { genDocId } = require('../miscellaneous/generateId');

const {
	InstitutionNotFound,
	DuplicateEntry
} = require('../miscellaneous/errors');
const { waitTx } = require('../miscellaneous/waitTransaction');

const registerInstitution = async (req, res, next) => {
	const {
		walletAddress,
		email,
		details: { name, type, txHash }
	} = req.body;

	// Validate inputs
	isString(txHash, 'Transaction Hash');
	isString(name, 'Institution Name');
	isString(type, 'Institution Type');

	// Validate details
	await new Institution({
		walletAddress,
		name,
		email,
		instType: type
	}).validate();

	// Check if walletAddress is unique
	if (await Institution.findOne({ walletAddress }))
		throw new DuplicateEntry('Wallet address already registered');

	// Wait for transaction to be mined
	await waitTx(txHash, () =>
		Institution.create({ walletAddress, name, email, instType: type })
	);

	res.status(201).json({
		message: 'Institution registration waiting to be mined'
	});
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
	const institution = walletAddress ? await Institution.findOne({ walletAddress }) : await Institution.find()

	res.status(200).json(institution);
};





const getMembers = async (req, res, next) => {
	const { walletAddress } = req.query;

	// Validate input
	isString(walletAddress, 'Wallet Address', true);

	// Find the institution and get the members
	const institution = await Institution.findById(req.user.id)
		.populate('members.user')
		.exec();

   	// Filter members with walletAddress
	// const members = institution.members
    //     .filter(({ user: { walletAddress: wa } }) =>
    //         walletAddress ? wa === walletAddress : true
    //     )
    //     // Remove the private documents
    //     .map(({ documents, ...user }) => ({
    //         ...user,
    //         documents: documents
    //             // Filter only the public documents
    //             .filter(({ mode }) => mode === 'public')
    //             // Return only the default access code
    //             .map(({ codes: [code], ...doc }) => ({ ...doc, code }))
    //     }));

    let members = institution
        .toJSON()
        .members.map(({user:{documents, ...user}, ...member}) => ({
            ...member,
            user: {
                ...user,
                documents:documents
                    .filter(({mode})=> mode === 'public')
                    .map(({codes: [code], ...doc}) => ({...doc, code}))
            }
        }))

        console.log(members)

    res.status(200).json(members);

};

const addOfferedDoc = async (req, res, next) => {
	const { title, description, price, requirements } = req.body;

    console.log(req.body)
    console.log(req.user)

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
	updateInstitution,
	getInstitutions,
	getMembers,
	addOfferedDoc,
	getOfferedDocs
};
