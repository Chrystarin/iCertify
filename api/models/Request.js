const { Schema, model } = require('mongoose');
const { ObjectId, Mixed } = Schema.Types;

module.exports = model(
	'Request',
	new Schema(
		{
			requestId: {
				type: String,
				unique: true,
				required: [true, 'Request ID is required']
			},
			requestType: {
				type: String,
				enum: {
					values: ['join', 'document'],
					message: "'{VALUE}' is not supported request type"
				},
				required: [true, 'Request type is required']
			},
			status: {
				type: String,
				enum: {
					values: [
						'pending',
						'approved',
						'declined',
						'paid',
						'verified',
						'cancelled',
						'processing',
						'completed'
					],
					message: "'{VALUE}' is not supported as request status"
				},
				default: 'pending'
			},
			requestor: {
				type: ObjectId,
				ref: 'User',
				required: true
			},
			institution: {
				type: ObjectId,
				ref: 'Institution',
				required: true
			},
			details: {
				type: Mixed,
				default: {}
			}
			/**
			 * Join Request - Details
			 *
			 * idNumber
			 * membership
			 *
			 * Document Request - Details
			 *
			 * offeredDoc
			 * statusTimestamps
			 *     approved
			 *     cancelled
			 *     completed
			 *     declined
			 *     paid
			 *     processing
			 *     verified
			 * proof
			 * note
			 *
			 */
		},
		{ timestamps: true }
	)
);
