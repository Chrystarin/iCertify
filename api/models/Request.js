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
				enum: ['insitution', 'document'],
				required: true
			},
			status: {
				type: String,
				enum: ['pending', 'approved', 'rejected'],
				required: true
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
		{ timeseries: true }
	)
);
