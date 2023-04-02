const Institution = require('../models/Institution');
const Request = require('../models/Request');
const User = require('../models/User');

const {
	requests: { JOIN, DOCUMENT },
	roles: { USER, INSTITUTION }
} = require('../miscellaneous/constants');
const {
	MemberNotFound,
	NotFound,
	InstitutionNotFound,
	DuplicateEntry
} = require('../miscellaneous/errors');
const { genRequestId } = require('../miscellaneous/generateId');
const { isString } = require('../miscellaneous/checkInput');

const getRequests = async (req, res, next) => {
	const { type, walletAddress, requestId } = req.query;

	// Validate inputs
	isString(type, 'Request Type', true);

	// Create request query
	let requestQuery = {};

	if (type) requestQuery = { ...requestQuery, requestType: type };

	// Add requestId to query if it is given
	if (requestId) {
		isString(requestId, 'Request ID');
		requestQuery = { ...requestQuery, requestId };
	}

    console.log(req.user.type)

	if (req.user.type == USER)
		requestQuery = { ...requestQuery, requestor: req.user.id };

	if (req.user.type == INSTITUTION) {
		// Validate input
		isString(walletAddress, 'Member Wallet Address', true);

		// Add insitution property to the request query
		requestQuery = { ...requestQuery, institution: req.user.id };

		// Check if member wallet address is given
		if (walletAddress) {
			// Get the institution
			const institution = await Institution.findById(req.user.id)
				.populate('members.user')
				.exec();

			// Check if member wallet address is member of institution
			const member = institution.members.find(
				({ user: { walletAddress: wa } }) => walletAddress === wa
			);
			if (!member) throw new MemberNotFound();

			// Add requestor property to the query
			requestQuery = { ...requestQuery, requestor: member.user.id };
		}
	}

	// Get the requests
	const requests = await Request.find(requestQuery)
		.populate('requestor institution')
		.exec();

	res.status(200).json(requests);
};

const processRequest = async (req, res, next) => {
	const { requestId, status } = req.body;

	// Validate inputs
	isString(requestId, 'Request ID');
	isString(status, 'Request Status');

	// Find request
	const request = await Request.findOne({ requestId, status: 'pending' })
		.populate('member institution')
		.exec();
	if (!request)
		throw new NotFound(
			'There is no such request with the given requestId that is pending'
		);

	if (status === 'pending') {
		// Join the requestor to institution
		if (request.requestType === JOIN) {
			await Institution.findByIdAndUpdate(request.institution, {
				$push: {
					members: {
						user: request.requestor,    
						idNumber: request.details?.idNumber
					}
				}
			});
		}
		if (request.requestType === DOCUMENT) {
		}
	}

	// Update status
	request.status = 'approved';

	await request.save();

	res.status(200).json({ message: 'Request processed' });
};

const createRequest = async (req, res, next) => {
	const { type, walletAddress } = req.body;

	// Validate inputs
	isString(type, 'Request Type');
	isString(walletAddress, 'Institution Wallet Address');

	// Find institution
	const institution = await Institution.findOne({ walletAddress });
	if (!institution) throw new InstitutionNotFound();

	// Find member
	const member = institution.members.find(({ user }) =>
		user.equals(req.user.id)
	);

	let requestParams = {
		requestId: genRequestId(),
		requestor: req.user.id,
		institution: institution._id
	};

	if (type == JOIN) {
		// Check if user is already a member of the institution
		if (member)
			new DuplicateEntry('User is already a member of the institution');

		// Check if request already done
		const requestExists = await Request.exists({
			requestor: req.user.id,
			institution: institution._id,
			status: 'pending'
		});
		if (requestExists)
			throw new DuplicateEntry('Join request already created');

		const requestDetails = {};

		// Check if ID number is required
		if (institution.needs.ID) {
			const { idNumber } = req.body;

			// Validate input
			isString(idNumber, 'ID Number');

			// Add idNumber to the request details
			requestDetails = { ...requestDetails, idNumber };
		}

		// Check if proof of membership is required
		if (institution.needs.membership) {
			const { membership } = req.body;

			// Validate input
			isString(membership, 'Proof of Membership');

			// Add membership to the request details
			requestDetails = { ...requestDetails, membership };
		}

		// Add requestType to requestParams
		requestParams = {
			...requestParams,
			requestType: JOIN,
			details: requestDetails
		};
	}

	if (type == DOCUMENT) {
		// Check if user is a member of the institution
		if (!member) throw new MemberNotFound();

		const { docId } = req.body;

		// Validate input
		isString(docId, 'Document ID');

		// Check if document is offered by the institution
		const offeredDoc = institution.docOffers.find(
			({ docId: di }) => docId === di
		);
		if (!offeredDoc)
			throw new NotFound(
				'The document is not offered by the institution'
			);

		// Add requestType to requestParams
		requestParams = {
			...requestParams,
			requestType: DOCUMENT,
			details: { docId }
		};
	}

	// Create request
	await Request.create(requestParams);

	res.status(201).json({
		message: 'Request saved',
		requestId: requestParams.requestId
	});
};

module.exports = { getRequests, createRequest, processRequest };
