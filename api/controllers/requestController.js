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
	Unauthorized
} = require('../miscellaneous/errors');
const { genRequestId } = require('../miscellaneous/generateId');
const { isString } = require('../miscellaneous/checkInput');

const getRequests = async (req, res, next) => {
	const {
		query: { requestId },
		user: { id, type }
	} = req;

	// Validate inputs
	isString(type, 'Request Type', true);

	// Create request query
	let requestQuery = {};

	if (type == USER) requestQuery.requestor = id;

	if (type == INSTITUTION) requestQuery.institution = id;

	// Get the requests
	let requests = await Request.find(requestQuery);

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
			const {
				body: { idNumber }
			} = req;

			// Validate input
			isString(idNumber, 'Membership ID');

			// Add idNumber to the request details
			requestParams.details.idNumber = idNumber;
		}

		// Check if proof of membership is required
		if (institution.needs.membership) {
			const {
				body: { membership }
			} = req;

			// Validate input
			isString(membership, 'Proof of Membership');

			// Add membership to the request details
			requestParams.details.membership = membership;
		}
	}

	if (type === DOCUMENT) {
		// Check if user is a member of the institution
		if (!member) throw new MemberNotFound();

		const {
			body: { docId }
		} = req;

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
		details: { idNumber }
	} = request;

	// Add requestor to institution members
	await Institution.findByIdAndUpdate(
		institution,
		{ $push: { members: { user, idNumber } } },
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
		body: { requestId, status },
		user: { id, type }
	} = req;

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

				const {
					body: { proof }
				} = req;
				isString(proof, 'Proof of Payment');

				rqst.details.statusTimestamps.paid = new Date();
				rqst.details.proof = proof;

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
				if (rqst.requestType === DOCUMENT)
					request = approveDocument(rqst);

				break;
			case 'declined':
				// Check if status is pending or paid
				if (!['pending', 'paid'].includes(rqst.status)) break;

				// Document request
				if (rqst.requestType === DOCUMENT) {
					const {
						body: { note }
					} = req;
					isString(note, 'Note of Declination');

					rqst.details.statusTimestamps.declined = new Date();
					rqst.details.note = note;
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

	res.status(200).json({ message: 'Request processed', requestId, status });
};

module.exports = { getRequests, createRequest, processRequest };
