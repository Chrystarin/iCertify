const Institution = require('../models/Institution');
const Request = require('../models/Request');
const User = require('../models/User');

const { isString } = require('../miscellaneous/checkInput');
const { JOIN, DOCUMENT } = require('../miscellaneous/requestType');
const { genRequestId } = require('../miscellaneous/generateId');
const { CustomError } = require('../miscellaneous/errors');
const { USER, INSTITUTION } = require('../miscellaneous/userRoles');

const getRequests = async (req, res, next) => {
	const { type, walletAddress, requestId } = req.query;

	try {
		// Validate inputs
		isString(type, 'Request Type');
		isString(requestId, 'Request ID', true);

		// Create request query
		let requestQuery = { requestType: type };

		// Add requestId to query if it is given
		if (requestId) requestQuery = { ...requestQuery, requestId };

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
				if (!member)
					throw new CustomError(
						'Member Not Found',
						'There is no such member with that wallet address',
						404
					);

				// Add requestor property to the query
				requestQuery = { ...requestQuery, requestor: member.user.id };
			}
		}

		// Get the requests
		const requests = await Request.find(requestQuery)
			.populate('requestor institution')
			.exec();

		res.status(200).json(requests);
	} catch (error) {
		next(error);
	}
};

const processRequest = async (req, res, next) => {
	const { requestId, status } = req.body;

	try {
		// Validate inputs
		isString(requestId, 'Request ID');
		isString(status, 'Request Status');

		// Find request
		const request = await Request.findOne({ requestId, status: 'pending' });
		if (!request)
			throw new CustomError(
				'Request Not Found',
				'There is no such request with the given requestId that is pending',
				404
			);

		// Update status
		request.status = status;
		await request.save();

		res.status(200).json({ message: 'Request processed' });
	} catch (error) {
		next(error);
	}
};

const createRequest = async (req, res, next) => {
	const { type, walletAddress } = req.body;

	try {
		// Validate inputs
		isString(type, 'Request Type');
		isString(walletAddress, 'Institution Wallet Address');

		// Find institution
		const institution = await Institution.findOne({ walletAddress });
		if (!institution)
			throw new CustomError(
				'Institution Not Found',
				'There is no such institution with that wallet address',
				404
			);

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
				throw new CustomError(
					'Member Already',
					'User is already a member of the institution',
					409
				);

			// Add requestType to requestParams
			requestParams = { ...requestParams, requestType: JOIN };
		}

		if (type == DOCUMENT) {
			// Check if user is a member of the institution
			if (!member) {
				throw new CustomError(
					'Member Not Found',
					'There is no such member with that wallet address',
					404
				);
			}

			// Add requestType to requestParams
			requestParams = { ...requestParams, requestType: DOCUMENT };
		}

		// Check if requestParams has requestType
		if (!requestParams.requestType)
			throw new CustomError(
				'Invalid Request Type',
				'The given request type is not an option',
				403
			);

		// Create request
		await Request.create(requestParams);

		res.status(201).json({
			message: 'Request saved',
			requestId: requestParams.requestId
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getRequests,
	createRequest,
	processRequest
};
