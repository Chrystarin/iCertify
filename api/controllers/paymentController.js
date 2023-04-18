const asyncHandler = require('../middlewares/asyncHandler');
const Request = require('../models/Request');

const { payment } = asyncHandler({
	payment: async (req, res, next) => {
		const {
			data: {
				attributes: {
					data: {
						attributes: { description, reference_number }
					}
				}
			}
		} = req.body;

		// Get the requestId from the description
		const requestId = description.split(' for ')[1];

		// Update request with given reference number to paid
		await Request.findOneAndUpdate(
			{
				requestId,
				status: 'approved',
				'details.paymentReference': reference_number
			},
			{ $set: { status: 'paid' } },
			{ runValidators: true }
		);
	}
});

module.exports = payment;
