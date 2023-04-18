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
	DuplicateEntry
} = require('../miscellaneous/errors');
const { genRequestId } = require('../miscellaneous/generateId');
const { isString } = require('../miscellaneous/checkInput');
const paymongo = require('../miscellaneous/paymongo');

const getRequests = async (req, res, next) => {
	const { type, walletAddress, requestId } = req.query;
	const { id, type: userType } = req.user;

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

	if (userType == USER) requestQuery = { ...requestQuery, requestor: id };

	if (userType == INSTITUTION) {
		isString(walletAddress, 'Member Wallet Address', true);

		// Add insitution property to the request query
		requestQuery = { ...requestQuery, institution: id };

		// Check if member wallet address is given
		if (walletAddress) {
			// Get the institution
			const institution = await Institution.findById(id)
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
	let requests = await Request.find(requestQuery)
		.populate('requestor institution')
		.exec();

	if (requestId) [requests] = requests;

	res.status(200).json(requests);
};

const processRequest = async (req, res, next) => {
	const { requestId, status } = req.body;
	const { id, type } = req.user;

	// Validate inputs
	isString(requestId, 'Request ID');
	isString(status, 'Request Status');

	let request;

	// Only cancel request
	if (type === USER) {
		// Find request
		request = await Request.findOne({
			requestId,
			requestor: id,
			status: { $in: ['pending', 'approved'] }
		});
		if (!request)
			throw new NotFound(
				'There is no such request with the given requestId that is pending or approved'
			);
	}

	if (type === INSTITUTION) {
		// Find request
		request = await Request.findOne({
			requestId,
			institution: id,
			status: 'pending'
		});
		if (!request)
			throw new NotFound(
				'There is no such request with the given requestId that is pending'
			);

		if (status === 'approved') {
			const { requestType, requestor, details } = request;

			if (requestType === JOIN)
				await Institution.findByIdAndUpdate(
					id,
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

			if (requestType === DOCUMENT) {
				const { price, title } = details;

				// Create payment link and get the reference_number
				const {
					data: {
						attributes: { reference_number, checkout_url }
					}
				} = await paymongo.createALink({
					data: {
						attributes: {
							amount: (price * 100) | 0,
							description: `${title} for ${requestId}`
						}
					}
				});

				// Save reference_number to request details
				request.details.paymentReference = reference_number;
				request.details.checkoutUrl = checkout_url;
				request.markModified('details');
			}
		}
	}

	// Update status
	request.status = status;
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
			details: offeredDoc
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
