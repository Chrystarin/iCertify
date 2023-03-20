const Institution = require('../models/Institution');
const Request = require('../models/Request');
const User = require('../models/User');

const getRequests = async (req, res, next) => {
	const { type, walletAddress } = req.query;

	try {
		// Validate input
		isString(type, 'Request Type');
		isString(walletAddress, 'Wallet Address', true);

		let requestQuery = {
			institution: req.user.id,
			type
		};

		if (walletAddress) {
			// Find user with wallet address
			const user = await User.findOne({ walletAddress });
			if (!user)
				throw new CustomError(
					'User Not Found',
					'There is no such user with that wallet address',
					404
				);

			// Add requestor property to the query
			requestQuery.requestor = user._id;
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

		// Find request and update
		await Request.findOneAndUpdate(
			{ requestId, status: 'pending' },
			{ status }
		);

		res.status(200).json({ message: 'Request processed' });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getRequests,
	processRequest
};
