const Institution = require('../models/Institution');
const Request = require('../models/Request');

const {
	requests: { JOIN, DOCUMENT },
	roles: { USER, INSTITUTION }
} = require('../miscellaneous/constants');
const {
	DuplicateEntry,
	InstitutionNotFound,
	InvalidInput,
	MemberNotFound,
	NotFound,
	Unauthorized,
    UserBlocked
} = require('../miscellaneous/errors');
const { genRequestId } = require('../miscellaneous/generateId');
const { isString } = require('../miscellaneous/checkInput');
const uploadImage = require('../miscellaneous/uploadImage');

const getRequests = async (req, res, next) => {
	// Destructure the query and user objects from the request object
	const {
		query: { requestId, requestType },
		user: { id, type }
	} = req;

	// Validate that requestType and requestId are both strings
	isString(requestType, 'Request Type');
	isString(requestId, 'Request ID', true);

	// Create the request query object
	const requestQuery = { requestType };

	// If the user is of type USER, add the user's id to the request query
	if (type === USER) requestQuery.requestor = id;

	// If the user is of type INSTITUTION, add the institution's id to the request query
	if (type === INSTITUTION) requestQuery.institution = id;

	// Construct the query based on whether requestId is present or not
	const query = requestId
		? Request.findOne({ ...requestQuery, requestId })
		: Request.find(requestQuery);

	// Get the requests from the database
	const requests = await query
		.lean()
		.populate({ path: 'requestor', select: '-documents' })
		.populate('institution')
		.exec();

	// Send the requests as a JSON response
	res.json(requests);
};

// This function creates a request based on the request type (JOIN or DOCUMENT) and user inputs.
const createRequest = async (req, res, next) => {
	const {
		body: { type, walletAddress }, // Destructure user inputs from request body
		user: { id } // Get user ID from request object
	} = req;

	// Validate user inputs
	isString(type, 'Request Type');
	isString(walletAddress, 'Institution Wallet Address');

	// Find institution based on wallet address
	const institution = await Institution.findOne({ walletAddress, 'transaction.status': 'success' });
	if (!institution) throw new InstitutionNotFound();

	// Find member based on user ID in institution's member list
	const member = institution.members.find(({ user }) => user.equals(id));

	// Create request data object with some initial parameters
	const requestParams = {
		requestId: genRequestId(), // Generate a unique ID for the request
		requestor: id, // Set the ID of the user who made the request
		institution: institution._id, // Set the ID of the institution
		details: {} // Initialize an empty object for request details
	};

	// If the request type is JOIN, perform additional checks and add more details to the request
	if (type === JOIN) {
		// Check if user is already a member of the institution
		if (member)
			new DuplicateEntry('User is already a member of the institution');

		// Check if a join request has already been created by the user
		const requestExists = await Request.exists({
			requestor: id,
			institution: institution._id,
			status: 'pending'
		});
		if (requestExists)
			throw new DuplicateEntry('Join request already created');

        // Check if user is blocked in the institution
        if (institution.blocked.includes(id))
            throw new UserBlocked();

		// Add requestType to requestParams
		requestParams.requestType = JOIN;

		// Check if ID number is required for membership
		if (institution.needs.ID) {
			const { idNumber } = req.body;

			// Validate ID number input
			isString(idNumber, 'Membership ID');

			// Add idNumber to the request details
			requestParams.details.idNumber = idNumber;
		}

		// Check if proof of membership is required for membership
		if (institution.needs.membership) {
			const { proof } = req.files;

			// Throw an error if proof of membership is not included
			if (!proof)
				throw new InvalidInput('Proof of Membership must be included');

			// Add membership to the request details by uploading the proof image and storing the URL
			requestParams.details.membership = await uploadImage(
				proof,
				`requests/${requestParams.requestId}-${Date.now()}`
			);
		}
	}

	// If the request type is DOCUMENT, perform additional checks and add more details to the request
	if (type === DOCUMENT) {
		// Check if user is a member of the institution
		if (!member) throw new MemberNotFound();

		const { docId } = req.body;

		// Validate document ID input
		isString(docId, 'Document Offer ID');

		// Check if the document is offered by the institution
		const offeredDoc = institution.docOffers.find(
			(offer) => offer.docId === docId
		);
		if (!offeredDoc)
			throw new NotFound(
				'The document is not offered by the institution'
			);

		// Check if a request for the same document has already been created by the user
		const existingRequest = await Request.findOne({
			requestor: id,
			institution: institution._id,
			status: 'pending',
			'details.offeredDoc.docId': docId
		});
		if (existingRequest)
			throw new DuplicateEntry('Document request already created');

		// Set requestType to DOCUMENT and create a details object with offeredDoc and statusTimestamps object
		requestParams.requestType = DOCUMENT;
		requestParams.details = {
			offeredDoc, // The document being offered
			statusTimestamps: {
				pending: new Date() // The timestamp when the request is pending
			}
		};
	}

	// Create a request using the requestParams object
	await Request.create(requestParams);

	// Send a response with status 201 and a message including the requestId
	res.status(201).json({
		message: 'Request saved',
		requestId: requestParams.requestId // The ID of the saved request
	});
};

const processRequest = async (req, res, next) => {
	// Destructuring request object to get relevant data
	const {
		body: {requestId}, // request body
		user: { id, type } // user id and type
	} = req;

	// Parsing request body to extract requestId and status
    let { status } = req.body;

    console.log(req.body)

	// Validating inputs
	isString(requestId, 'Request ID');
	isString(status, 'Request Status');

	// Creating query object to find request based on user type
	const requestQuery = { requestId };
	if (type === USER) requestQuery.requestor = id;
	if (type === INSTITUTION) requestQuery.institution = id;

	// Finding request based on query
	const request = await Request.findOne(requestQuery);
	if (!request) throw new NotFound('Request not found');

	// Checking if status is valid based on user type
	if (
		(type === USER && !['paid', 'cancelled'].includes(status)) ||
		(type === INSTITUTION &&
			!['approved', 'declined', 'verified'].includes(status))
	) {
		throw new Unauthorized('Invalid status for type of user');
	}

	// Update request status based on the status received
	switch (status) {
		case 'approved':
			// Check if the request status is pending
			if (request.status !== 'pending')
				throw new Unauthorized('Invalid request status');

			console.log(request.requestType);

			// Process the request based on the request type
			if (request.requestType === JOIN) {
				const { institution, requestor, details } = request;

				await Institution.findByIdAndUpdate(
					institution,
					{
						$push: {
							members: {
								user: requestor,
								idNumber: details?.idNumber
							}
						}
					},
					{ runValidators: true }
				);
			}

			if (request.requestType === DOCUMENT) {
				const {
					details: {
						offeredDoc: { price }
					}
				} = request;

				console.log(price)
				console.log(price===0)

				request.details.statusTimestamps.approved = new Date();

				if (Number(price.toString()) === 0) {
					request.details.statusTimestamps.paid = new Date();
					request.details.statusTimestamps.verified = new Date();
                    status = 'verified';
				}
			}

			break;
		case 'cancelled':
			// Throw an error if the request status is not pending or approved
			if (!['pending', 'approved'].includes(request.status))
				throw new Unauthorized('Invalid request status');

			// Update the statusTimestamps object with the current time
			request.details.statusTimestamps.cancelled = new Date();
			break;
		case 'declined':
			// Throw an error if the request status is not pending or paid
			if (!['pending', 'paid'].includes(request.status))
				throw new Unauthorized('Invalid request status');

			// If the request type is DOCUMENT, update the statusTimestamps object and note
			if (request.requestType === DOCUMENT) {
				request.details.statusTimestamps.declined = new Date();
				request.details.note = JSON.parse(req.body.body).note;
			}

			break;
		case 'paid':
			// Throw an error if the request status is not approved
			if (request.status !== 'approved')
				throw new Unauthorized('Invalid request status');

			// Get the proof of payment file from the request object
			const { proof } = req.files;

			// Throw an error if proof of payment is not included
			if (!proof)
				throw new InvalidInput('Proof of Payment must be included');

			// Update the statusTimestamps object with the current time and upload the proof of payment file
			request.details.statusTimestamps.paid = new Date();
			request.details.proof = await uploadImage(
				proof,
				`requests/${request.requestId}-${Date.now()}}`
			);
			break;
		case 'verified':
			// Throw an error if the request status is not paid
			if (request.status !== 'paid')
				throw new Unauthorized('Invalid request status');

			// Update the statusTimestamps object with the current time
			request.details.statusTimestamps.verified = new Date();
			break;
		default:
			// Throw an error if the status is not valid for the user type
			throw new Unauthorized('Invalid status for this type of user');
	}

	// Updating request status
	request.status = status;

	// Marking changes as modified and saving them
	request.markModified('details');
	await request.save();

	// Sending response with success message and updated request details
	res.json({ message: 'Request processed', requestId, status });
};

module.exports = { getRequests, createRequest, processRequest };
