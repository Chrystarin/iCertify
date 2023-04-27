const Institution = require('../models/Institution');
const Request = require('../models/Request');

const {
	requests: { JOIN, DOCUMENT },
	roles: { USER, INSTITUTION }
} = require('../miscellaneous/constants');
const {
	MemberNotFound,
	NotFound,
	InstitutionNotFound,
	DuplicateEntry,
	Unauthorized,
	InvalidInput
} = require('../miscellaneous/errors');
const { genRequestId } = require('../miscellaneous/generateId');
const { isString } = require('../miscellaneous/checkInput');
const uploadImage = require('../miscellaneous/uploadImage');

const getRequests = async (req, res, next) => {
	const {
		query: { requestId, requestType },
		user: { id, type }
	} = req;

	// Validate inputs
	isString(requestType, 'Request Type');

	// Create request query
	let requestQuery = { requestType };

	if (type == USER) requestQuery.requestor = id;

	if (type == INSTITUTION) requestQuery.institution = id;

	// Get the requests
	let requests = await Request.find(requestQuery)
            .lean()
            .populate('institution requestor')
            .exec()

	if (requestId) {
		requests = requests.find(({ requestId: ri }) => ri == requestId);
		if (!requests) throw new NotFound('Request not found');
	}

	res.json(requests);
};

const createRequest = async (req, res, next) => {
	const {
		body: { type, walletAddress },
		user: { id }
	} = req;

	// Validate inputs
	isString(type, 'Request Type');
	isString(walletAddress, 'Institution Wallet Address');

	// Find institution
	const institution = await Institution.findOne({ walletAddress });
	if (!institution) throw new InstitutionNotFound();

	// Find member
	const member = institution.members.find(({ user }) => user.equals(id));

	// Create request data
	const requestParams = {
		requestId: genRequestId(),
		requestor: id,
		institution: institution._id,
		details: {}
	};

	if (type === JOIN) {
		// Check if user is already a member of the institution
		if (member)
			new DuplicateEntry('User is already a member of the institution');

		// Check if request already done
		const requestExists = await Request.exists({
			requestor: id,
			institution: institution._id,
			status: 'pending'
		});
		if (requestExists)
			throw new DuplicateEntry('Join request already created');

		// Add requestType to requestParams
		requestParams.requestType = JOIN;

		// Check if ID number is required
		if (institution.needs.ID) {
			const { idNumber } = req.body;

			// Validate input
			isString(idNumber, 'Membership ID');

			// Add idNumber to the request details
			requestParams.details.idNumber = idNumber;
		}

		// Check if proof of membership is required
		if (institution.needs.membership) {
			const { proof } = req.files;

			if (!proof)
				throw new InvalidInput('Proof of Payment must be included');

			// Add membership to the request details
			requestParams.details.membership = await uploadImage(
				proof,
				`requests/${requestParams.requestId}-${Date.now()}}`
			);
		}
	}

	if (type === DOCUMENT) {
		// Check if user is a member of the institution
		if (!member) throw new MemberNotFound();

		const { docId } = req.body;

		// Validate input
		isString(docId, 'Document Offer ID');

		// Check if document is offered by the institution
		const offeredDoc = institution.docOffers.find(
			({ docId: di }) => docId === di
		);
		if (!offeredDoc)
			throw new NotFound(
				'The document is not offered by the institution'
			);

		// Add requestType to requestParams
		requestParams.requestType = DOCUMENT;
		requestParams.details = { offeredDoc, statusTimestamps: {} };
	}

	// Create request
	await Request.create(requestParams);

	res.status(201).json({
		message: 'Request saved',
		requestId: requestParams.requestId
	});
};

const approveJoin = async (request) => {
	const {
		institution,
		requestor: user,
		details
	} = request;

	// Add requestor to institution members
	await Institution.findByIdAndUpdate(
		institution,
		{ $push: { members: { user, idNumber: details?.idNumber } } },
		{ runValidators: true }
	);

	return request;
};

const approveDocument = (request) => {
	const {
		details: {
			offeredDoc: { price }
		}
	} = request;

	request.details.statusTimestamps.approved = new Date();

	if (price === 0) {
		request.details.statusTimestamps.paid = new Date();
		request.details.statusTimestamps.verified = new Date();
	}

	return request;
};

const processRequest = async (req, res, next) => {
	const {
        body: { body },
		user: { id, type }
	} = req;

    const {
		requestId,
		status
	} = JSON.parse(body)

	// Validate inputs
	isString(requestId, 'Request ID');
	isString(status, 'Request Status');

	let request;

	if (type === USER) {
		const rqst = await Request.findOne({ requestId, requestor: id });

		switch (status) {
			case 'paid':
				// Check rqst status if approved
				if (rqst.status !== 'approved') break;

				// Get the proof of payment
				const { proof } = req.files;

				if (!proof)
					throw new InvalidInput('Proof of Payment must be included');

				rqst.details.statusTimestamps.paid = new Date();
				rqst.details.proof = await uploadImage(
					proof,
					`requests/${rqst.requestId}-${Date.now()}}`
				);

				request = rqst;

				break;
			case 'cancelled':
				// Check if rqst status if pending or approved
				if (!['pending', 'approved'].includes(rqst.status)) break;

				rqst.details.statusTimestamps.cancelled = new Date();

				request = rqst;

				break;
			default:
				throw new Unauthorized('Invalid status for type of user');
		}
	}

	if (type === INSTITUTION) {
		const rqst = await Request.findOne({ requestId, institution: id });

		switch (status) {
			case 'approved':
				// Check if rqst is pending
				if (rqst.status !== 'pending') break;

				// Join request
				if (rqst.requestType === JOIN)
					request = await approveJoin(rqst);

				// Document request
				if (rqst.requestType === DOCUMENT) {
					if(rqst.details.statusTimestamps === undefined)
						rqst.details.statusTimestamps = {}

					request = approveDocument(rqst);
				}

				break;
			case 'declined':
				// Check if status is pending or paid
				if (!['pending', 'paid'].includes(rqst.status)) break;

				// Document request
				if (rqst.requestType === DOCUMENT) {
					if(rqst.details.statusTimestamps === undefined)
						rqst.details.statusTimestamps = {}

					rqst.details.statusTimestamps.declined = new Date();
					rqst.details.note = req.body.note;
				}

				request = rqst;

				break;
			case 'verified':
				// Check if rqst status is paid
				if (rqst.status !== 'paid') break;

				rqst.details.statusTimestamps.verified = new Date();

				request = rqst;

				break;
			default:
				throw new Unauthorized('Invalid status for type of user');
		}
	}

	if (!request) throw new NotFound('Request not found');

	// Update status
	request.status = status;

	// Save changes
	request.markModified('details');
	await request.save();

	res.json({ message: 'Request processed', requestId, status });
};

module.exports = { getRequests, createRequest, processRequest };
