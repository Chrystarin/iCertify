const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

module.exports = model(
	'Request',
	new Schema(
		{
			requestId: {
				type: String,
				unique: true,
				required: true
			},
			requestType: {
				type: String,
				enum: ['join', 'document'],
				required: true
			},
			status: {
				type: String,
				enum: ['pending', 'approved', 'rejected'],
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
			}
		},
		{ timestamps: true }
	)
);
