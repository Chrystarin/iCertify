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
const {
	InstitutionNotFound,
	DuplicateEntry,
	MemberNotFound,
	NotFound
} = require('../miscellaneous/errors');
const { waitTx, contract } = require('../miscellaneous/transactionUtils');
const { genDocId, genPaymentId } = require('../miscellaneous/generateId');
const uploadImage = require('../miscellaneous/uploadImage');

const registerInstitution = async (req, res, next) => {
	const {
		body: {
			walletAddress,
			email,
			details: { name, type, txHash }
		}
	} = req;

	// Validate inputs
	isString(txHash, 'Transaction Hash');
	isString(name, 'Institution Name');
	isString(type, 'Institution Type');

	if (
		// Check if walletAddress is registered in blockchain
		(await contract.checkInstitution(walletAddress)) &&
		// Check if walletAddress is registered in system
		!(await Institution.exists({ walletAddress }))
	) {
		await Institution.create({
			walletAddress,
			name,
			email,
			instType: type
		});

		return res.status(201).json({ message: 'Institution registered' });
	}

	// Create new institution
	const institution = new Institution({
		walletAddress,
		name,
		email,
		instType: type
	});

	// Validate details
	await institution.validate();

	// Check if walletAddress is unique
	if (await Institution.findOne({ walletAddress }))
		throw new DuplicateEntry('Wallet address already registered');

	// Wait for transaction to be mined
	await waitTx(
		txHash,
		() => institution.save(),
		(error) => {
			// Notify user failed registration
			console.log(error);
		}
	);

	res.status(201).json({
		message: 'Institution registration waiting to be mined'
	});
};

const updateInstitution = async (req, res, next) => {
    const {
		body: { body },
		user: { id },
		files,
	} = req;

	const {
		name,
		type,
		email,
		about,
		address,
		website,
		contactNo,
		needId,
		needMembership
	} = JSON.parse(body)

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

	// Get the institution
	let institution = await Institution.findById(id);

	institution.name = name;
	institution.instType = type;
	institution.email = email;
	institution.about = about;
	institution.address = address;
	institution.website = website;
	institution.contactNo = contactNo;
	institution.needs.ID = needId;
	institution.needs.membership = needMembership;

	// Check if profile photo is included in the update
	const profile = files?.profile;
	if (profile)
		institution.photos.profile = await uploadImage(
			profile,
			`profiles/${institution.walletAddress}-profile`
		);

	// Check if cover photo is included in the update
	const cover = files?.cover;
	if (cover)
		institution.photos.cover = await uploadImage(
			cover,
			`profiles/${institution.walletAddress}-cover`
		);

	// Apply and save changes
	await institution.save();

	res.json({ message: 'Institution info updated' });
};

const getInstitutions = async (req, res, next) => {
	const { walletAddress } = req.query;

	// Validate input
	isString(walletAddress, 'Wallet Address', true);

	// Find institutions
	let institutions = await Institution.find()
        .lean()
        .populate('members.user')
        .exec();;
    

	// Get specific institutions
	if (walletAddress)
		institutions = institutions.find(
			({ walletAddress: wa }) => walletAddress == wa
		);

	res.json(institutions);
};

const getMembers = async (req, res, next) => {
	const { walletAddress } = req.query;

	// Validate input
	isString(walletAddress, 'Wallet Address', true);

	// Find the institution and get the members
	const institution = await Institution.findById(req.user.id)
		.lean()
		.populate('members.user')
		.exec();

	// Get only the public documents and its default code
	let members = institution.members.map(
		({ user: { documents, ...user }, ...member }) => ({
			...member,
			user: {
				...user,
				documents: documents
					// Filter only the public documents
					.filter(({ mode }) => mode === 'public')
					// Return only the default access code
					.map(({ codes: [code], ...doc }) => ({ ...doc, code }))
			}
		})
	);

	// Filter the members by the walletAddress
	if (walletAddress) {
		members = members.find(
			({ user: { walletAddress: wa } }) => wa === walletAddress
		);

		// Check if memebr is existing
		if (!members) throw new MemberNotFound();
	}

	res.json(members);
};

const addOfferedDoc = async (req, res, next) => {
	const { title, description, price, requirements } = req.body;

	isString(title, 'Title');
	isString(description, 'Description');
	isNumber(price, 'Price');
	isString(requirements, 'Requirements');

	// Get institution and update
	await Institution.findByIdAndUpdate(
		req.user.id,
		{
			$push: {
				docOffers: {
					docId: genDocId(),
					title,
					description,
					price,
					requirements
				}
			}
		},
		{ runValidators: true }
	);

	res.status(201).json({ message: 'Offer saved' });
};

const getOfferedDocs = async (req, res, next) => {
	const {
		query: { walletAddress },
		user: { id, type }
	} = req;

	let docOffers;

	if (type === INSTITUTION) ({ docOffers } = await Institution.findById(id));

	if (type === USER) {
		isString(walletAddress, 'Institution Wallet Address');

		// Find institution
		const institution = await Institution.findOne({ walletAddress });
		if (!institution) throw new InstitutionNotFound();

		({ docOffers } = institution);
	}

	res.json(docOffers);
};

const addPayment = async (req, res, next) => {
	const {
		user: { id },
		body: { type }
	} = req;

    console.log(req.body)

	// Validate input
	isString(type, 'Payment Type');

	const paymentParams = { type, paymentId: genPaymentId() };

	if (type === 'bank') {
		const { bankName, accountName, accountNumber } = req.body;

		// Validate inputs
		isString(bankName, 'Bank Name');
		isString(accountName, 'Account Name');
		isString(accountNumber, 'Account Number');

		// Add details to paymentParams
		paymentParams.details = { bankName, accountName, accountNumber };
	}

	if (type === 'ewallet') {
		const { ewalletName, accountName, accountNumber } = req.body;

		// Validate inputs
		isString(ewalletName, 'E-Wallet Name');
		isString(accountName, 'Account Name');
		isString(accountNumber, 'Account Number');

		// Add details to paymentParams
		paymentParams.details = { ewalletName, accountName, accountNumber };
	}

	if (type === 'otc') {
		const { otcName, location, instructions } = req.body;

		// Validate inputs
		isString(otcName, 'Over-The-Counter Name');
		isString(location, 'Location');
		isString(instructions, 'Instructions');

		// Add details to paymentParams
		paymentParams.details = { otcName, location, instructions };
	}

	// Add payment details to payments array of institution
	await Institution.findByIdAndUpdate(
		id,
		{ $push: { payments: paymentParams } },
		{ runValidators: true }
	);

	res.status(201).json({
		message: 'Payment Details added',
		paymentId: paymentParams.paymentId
	});
};

const editPayment = async (req, res, next) => {
	const {
		user: { id },
		body: { paymentId }
	} = req;

	// Find institution that has same id and paymentId
	const institution = await Institution.findOne({
		_id: id,
		'payments.paymentId': paymentId
	});
	if (!institution) throw new NotFound('Payment Details not found');

	// Get the specific payment details by paymentId
	const payment = institution.payments.find(
		({ paymentId: pi }) => pi === paymentId
	);

	if (payment.type === 'bank') {
		const { bankName, accountName, accountNumber } = req.body;

		// Validate inputs
		isString(bankName, 'Bank Name');
		isString(accountName, 'Account Name');
		isString(accountNumber, 'Account Number');

		// Update details to payment
		payment.details = { bankName, accountName, accountNumber };
	}

	if (payment.type === 'ewallet') {
		const { ewalletName, accountName, accountNumber } = req.body;

		// Validate inputs
		isString(ewalletName, 'E-Wallet Name');
		isString(accountName, 'Account Name');
		isString(accountNumber, 'Account Number');

		// Update details to payment
		payment.details = { ewalletName, accountName, accountNumber };
	}

	if (payment.type === 'otc') {
		const { otcName, location, instructions } = req.body;

		// Validate inputs
		isString(otcName, 'Over-The-Counter Name');
		isString(location, 'Location');
		isString(instructions, 'Instructions');

		// Update details to payment
		payment.details = { otcName, location, instructions };
	}

	// Save changes
	await institution.save();

	res.json({ message: 'Paymen details updated' });
};

const deletePayment = async (req, res, next) => {
	const {
		user: { id },
		body: { paymentId }
	} = req;

	// Find institution that has same id and paymentId
	const institution = await Institution.findOne({
		_id: id,
		'payments.paymentId': paymentId
	});
	if (!institution) throw new NotFound('Payment Details not found');

	// Get index of payment with paymentId in payments of institution
	const payIdx = institution.payments.findIndex(
		({ paymentId: pi }) => pi === paymentId
	);

	// Remove a paymen by payIdx
	institution.payments.splice(payIdx, 1);

	// Save changes
	await institution.save();

	res.json({ message: 'Payment details removed' });
};

module.exports = {
	addOfferedDoc,
	getInstitutions,
	getMembers,
	getOfferedDocs,
	registerInstitution,
	updateInstitution,
	addPayment,
	deletePayment,
	editPayment
};
