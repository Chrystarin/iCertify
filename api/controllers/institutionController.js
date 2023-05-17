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
	NotFound,
	InvalidInput
} = require('../miscellaneous/errors');
const { waitTx, contract } = require('../miscellaneous/transactionUtils');
const { genDocId, genPaymentId } = require('../miscellaneous/generateId');
const uploadImage = require('../miscellaneous/uploadImage');

const registerInstitution = async (req, res, next) => {
	// Extract required data from the request body
	const {
		walletAddress, // Wallet address of the institution on the blockchain
		email, // Email of the institution
		details: { name, type, txHash } // Details of the institution
	} = req.body;

	// Validate inputs
	isString(txHash, 'Transaction Hash'); // Check if txHash is a string
	isString(name, 'Institution Name'); // Check if name is a string
	isString(type, 'Institution Type'); // Check if type is a string

	// Check if the institution is already registered on the blockchain
	// and if it is not already existing in the database
	const [isRegistered, isExisting] = await Promise.all([
		contract.checkInstitution(walletAddress),
		Institution.exists({ walletAddress, 'transaction.hash': txHash })
	]);

	// If the institution is already registered on the blockchain
	// but not in the database, create a new Institution document
	if (isRegistered && !isExisting) {
		await Institution.create({
			walletAddress,
			name,
			email,
			instType: type,
			transaction: { hash: txHash, status: 'success' }
		});

		return res.status(201).json({ message: 'Institution registered' });
	}

	// Create new institution document
	const institution = Institution.create({
		walletAddress,
		name,
		email,
		instType: type,
		transaction: { hash: txHash }
	});

	// Wait for the transaction to be mined
	await waitTx(
		txHash,
		// If the transaction is successfully mined, update the institution's transaction status to 'success' and save it to the database
		async () => {
			institution.transaction.status = 'success';
			await institution.save();
		},
		// If the transaction fails to be mined, update the institution's transaction status to 'failed', save it to the database, and log the error
		async (error) => {
			institution.transaction.status = 'failed';
			await institution.save();
			
		}
	);

	// Return response indicating successful registration
	res.status(201).json({
		message: 'Institution registration waiting to be mined'
	});
};

const updateInstitution = async (req, res, next) => {
	// Extract necessary data from request object
	const {
		body: { body }, // the request body containing updated institution data
		user: { id }, // the id of the user making the update
		files // any files included in the update, such as profile or cover photos
	} = req;

    

	// Extract updated institution data from request body
	const {
		name, // name of the institution
		type, // type of the institution
		email, // email address of the institution
		about, // a description of the institution
		address, // the address of the institution
		website, // the institution's website URL
		contactNo, // the institution's contact number
		needId, // a boolean indicating if the institution needs an ID
		needMembership // a boolean indicating if the institution requires membership
	} = JSON.parse(body);

	// Validate input
	isString(name, 'Institution Name'); // validate that name is a string
	isString(type, 'Institution Type'); // validate that type is a string
	isEmail(email); // validate that email is a valid email address
	isBoolean(needId, 'Need ID'); // validate that needId is a boolean
	isBoolean(needMembership, 'Need Membership'); // validate that needMembership is a boolean
	isString(about, 'About', true); // validate that about is a string (optional)
	isString(address, 'Address', true); // validate that address is a string (optional)
	isString(website, 'Website', true); // validate that website is a string (optional)
	isString(contactNo, 'Contract Number', true); // validate that contactNo is a string (optional)

	// Get the institution being updated
	let institution = await Institution.findById(id);

	// Update institution with new data
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
	if (profile) {
		// If profile photo is included, upload it and set it as the institution's profile photo
		institution.photos.profile = await uploadImage(
			profile,
			`profiles/${institution.walletAddress}-profile`
		);
	}

	// Check if cover photo is included in the update
	const cover = files?.cover;
	if (cover) {
		// If cover photo is included, upload it and set it as the institution's cover photo
		institution.photos.cover = await uploadImage(
			cover,
			`profiles/${institution.walletAddress}-cover`
		);
	}

	// Save updated institution data
	await institution.save();

	// Send response indicating success
	res.json({ message: 'Institution info updated' });
};

const getInstitutions = async (req, res, next) => {
	// Extract the wallet address from the query parameters
	const { walletAddress } = req.query;

	// Validate the wallet address (checks if it's a non-empty string)
	isString(walletAddress, 'Wallet Address', true);

	const institutionQuery = { 'transaction.status': 'success' };

	// Query the database for the institutions
	const query = walletAddress
		? Institution.findOne({ walletAddress, ...institutionQuery })
		: Institution.find(institutionQuery);

	// Populate the members.user field with user information for each member of the institution
	const institutions = await query.populate('members.user').exec();

    console.log(institutions)

	// Send the list of institutions as a JSON response
	res.json(institutions);
};

const getMembers = async (req, res, next) => {
	// Destructuring request object to get the walletAddress and user id from the query and user properties respectively
	const {
		query: { walletAddress },
		user: { id }
	} = req;

	// Validating the walletAddress input parameter
	isString(walletAddress, 'Wallet Address', true);

	// Finding the institution with the given id and populating the members
	let { members } = await Institution.findOne({ _id: id }, 'members')
		.populate('members.user') // Populating the user object of each member
		.lean() // Converting the result to plain JavaScript object
		.exec(); // Executing the query

	// Filtering the members by the given walletAddress, if any
	if (walletAddress)
		members = members.filter(
			({ user }) => user.walletAddress === walletAddress
		);

	// Filtering the members to get only the public documents of each user and their default access code
	members = members.map(({ user: { documents, ...user }, ...member }) => ({
		...member,
		user: {
			...user,
			documents: documents
				.filter(({ mode }) => mode === 'public')
				.map(({ codes: [code], ...doc }) => ({ ...doc, code }))
		}
	}));

	// Sending the filtered members as the response
	res.json(members);
};

const addOfferedDoc = async (req, res, next) => {
	// Destructure the request object to get required data
	const {
		body: { title, description, price, requirements }, // Document details
		user: { id } // Institution ID
	} = req;

	// Validate input fields using helper functions
	isString(title, 'Title');
	isString(description, 'Description');
	isNumber(price, 'Price');
	isString(requirements, 'Requirements');

	// Generate a new document ID
	const docId = genDocId(); // cache the ID generator function

	// Update the institution's document offers with the new document
	await Institution.findByIdAndUpdate(
		id, // ID of the institution
		{
			$push: {
				docOffers: {
					// Add a new document offer to the list
					docId, // Document ID
					title, // Document title
					description, // Document description
					price, // Document price
					requirements // Document requirements
				}
			}
		},
		{ runValidators: true } // Run Mongoose validators
	);

	res.status(201).json({ message: 'Offer saved' }); // Send response indicating success
};

const getOfferedDocs = async (req, res, next) => {
    // Retrieve the wallet address and document ID from the request query and the user ID and type from the request user object.
    const {
        query: { walletAddress, docId },
        user: { id, type }
    } = req;

    // Check if the document ID is a string and throw an error if it is not.
    isString(docId, 'Document ID', true);

    // Declare the variable that will hold the document offers.
    let docOffers;

    // If the user is an institution, retrieve the document offers associated with that institution.
    if (type === INSTITUTION) {
        // Retrieve the institution's document offers using the institution's ID.
        ({ docOffers } = await Institution.findById(id));
    }

    // If the user is a regular user, retrieve the document offers associated with the institution with the given wallet address.
    if (type === USER) {
        // Ensure that the wallet address is a string.
        isString(walletAddress, 'Institution Wallet Address');

        // Find the institution with the given wallet address and a successful transaction status and retrieve their document offers.
        const institution = await Institution.findOne(
            { walletAddress, 'transaction.status': 'success' },
            'docOffers'
        );
        // If no institution is found, throw an error.
        if (!institution) throw new InstitutionNotFound();

        // Retrieve the institution's document offers that have an active status.
        docOffers = institution.docOffers.filter(
            ({ status }) => status === 'active'
        );
    }

    // If document offers and document ID are both present, filter document offers to only include the document with the matching document ID.
    if (docOffers && docId)
        docOffers = docOffers.find((docs) => docs.docId === docId);

    // Return the retrieved document offers as JSON.
    res.json(docOffers);
};

const editOfferedDoc = async (req, res, next) => {
	// Extract relevant data from the request body and user object.
	const {
		body: { docId, title, description, price, requirements, status },
		user: { id }
	} = req;

	// Validate that each parameter extracted above is a string or number.
	isString(docId, 'Document ID');
	isString(title, 'Title');
	isString(description, 'Description');
	isNumber(price, 'Price');
	isString(requirements, 'Requirements');
    isString(status, 'Status');

	// Update the institution where the user ID matches and the docOffers array contains the given docId.
	// Set the docOffers array element that matches the given docId to the new values passed in.
	const result = await Institution.updateOne(
		{ _id: id, 'docOffers.docId': docId },
		{
			$set: {
				'docOffers.$': {
					docId,
					title,
					description,
					price,
					requirements,
                    status
				}
			}
		},
		{ runValidators: true }
	);

	// If no documents were modified, throw a NotFound error.
	if (result.modifiedCount === 0) throw new NotFound('Document not found');

	// Send a JSON response with a success message.
	res.json({ message: 'Offered document updated' });
};

const addPayment = async (req, res, next) => {
	// Extract the user ID and payment type from the request
	const {
		user: { id },
		body: { type }
	} = req;

	// Validate that the payment type is a string
	isString(type, 'Payment Type');

	// Initialize a paymentParams object with the payment type and a generated payment ID
	const paymentParams = { type, paymentId: genPaymentId() };

	switch (type) {
		case 'bank': {
			// Extract the bank name, account name, and account number from the request body
			const { bankName, accountName, accountNumber } = req.body;

			// Validate that the bank name, account name, and account number are strings
			isString(bankName, 'Bank Name');
			isString(accountName, 'Account Name');
			isString(accountNumber, 'Account Number');

			// Add the bank name, account name, and account number to the paymentParams object
			paymentParams.details = { bankName, accountName, accountNumber };
			break;
		}
		case 'ewallet': {
			// Extract the e-wallet name, account name, and account number from the request body
			const { ewalletName, accountName, accountNumber } = req.body;

			// Validate that the e-wallet name, account name, and account number are strings
			isString(ewalletName, 'E-Wallet Name');
			isString(accountName, 'Account Name');
			isString(accountNumber, 'Account Number');

			// Add the e-wallet name, account name, and account number to the paymentParams object
			paymentParams.details = { ewalletName, accountName, accountNumber };
			break;
		}
		case 'otc': {
			// Extract the over-the-counter name, location, and instructions from the request body
			const { otcName, location, instructions } = req.body;

			// Validate that the over-the-counter name, location, and instructions are strings
			isString(otcName, 'Over-The-Counter Name');
			isString(location, 'Location');
			isString(instructions, 'Instructions');

			// Add the over-the-counter name, location, and instructions to the paymentParams object
			paymentParams.details = { otcName, location, instructions };
			break;
		}
		default:
			throw new InvalidInput('Unsupported payment type');
	}

	// Add the payment details to the payments array of the institution associated with the user ID
	await Institution.findByIdAndUpdate(
		id,
		{ $push: { payments: paymentParams } },
		{ runValidators: true }
	);

	// Send a 201 status code and a JSON response with a success message and the payment ID
	res.status(201).json({
		message: 'Payment Details added',
		paymentId: paymentParams.paymentId
	});
};

const editPayment = async (req, res, next) => {
	// Destructure required fields from the request object
	const {
		user: { id }, // user id
		body: { paymentId } // payment id
	} = req;

	// Find institution that has the same id and paymentId
	const institution = await Institution.findOne(
		{
			_id: id,
			'payments.paymentId': paymentId
		},
		'payments'
	);

	// If institution is not found, throw an error
	if (!institution) throw new NotFound('Payment Details not found');

	// Get the specific payment details by paymentId
	const payment = institution.payments.find(
		(payment) => payment.paymentId === paymentId
	);

	// Switch statement to check payment type
	switch (payment.type) {
		case 'bank': {
			// Destructure required fields from the request object
			const { bankName, accountName, accountNumber } = req.body;

			// Validate inputs
			isString(bankName, 'Bank Name');
			isString(accountName, 'Account Name');
			isString(accountNumber, 'Account Number');

			// Update details to payment
			payment.details = { bankName, accountName, accountNumber };
			break;
		}
		case 'ewallet': {
			// Destructure required fields from the request object
			const { ewalletName, accountName, accountNumber } = req.body;

			// Validate inputs
			isString(ewalletName, 'E-Wallet Name');
			isString(accountName, 'Account Name');
			isString(accountNumber, 'Account Number');

			// Update details to payment
			payment.details = { ewalletName, accountName, accountNumber };
			break;
		}
		case 'otc': {
			// Destructure required fields from the request object
			const { otcName, location, instructions } = req.body;

			// Validate inputs
			isString(otcName, 'Over-The-Counter Name');
			isString(location, 'Location');
			isString(instructions, 'Instructions');

			// Update details to payment
			payment.details = { otcName, location, instructions };
			break;
		}
		default:
			// If the payment type is not supported, throw an error
			throw new InvalidInput('Unsupported payment type');
	}

	// Save the institution details
	await institution.save();

	// Send back success message
	res.json({ message: 'Payment details updated' });
};

const deletePayment = async (req, res, next) => {
	const {
		user: { id },
		body: { paymentId }
	} = req;

	const result = await Institution.updateOne(
		{
			_id: id,
			'payments.paymentId': paymentId
		},
		{ $pull: { payments: { paymentId } } },
		{ runValidators: true }
	).lean();

	if (result.modifiedCount === 0)
		throw new NotFound('Payment Details not found');

	res.json({ message: 'Payment details removed' });
};

module.exports = {
	addOfferedDoc,
	addPayment,
	deletePayment,
	editOfferedDoc,
	editPayment,
	getInstitutions,
	getMembers,
	getOfferedDocs,
	registerInstitution,
	updateInstitution
};
