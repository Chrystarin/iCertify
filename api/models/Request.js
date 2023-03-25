const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const {
	roles: { JOIN, DOCUMENT }
} = require('../miscellaneous/constants');

const joinSchema = new Schema({ idNumber: String, membership: String });
const documentSchema = new Schema({ docId: String });

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
					values: [JOIN, DOCUMENT],
					message: "'{VALUE}' is not supported request type"
				},
				required: [true, 'Request type is required']
			},
			status: {
				type: String,
				enum: {
					values: ['pending', 'approved', 'rejected'],
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
			details: function () {
				return this.requestType === JOIN ? joinSchema : documentSchema;
			}
		},
		{ timestamps: true }
	)
);
