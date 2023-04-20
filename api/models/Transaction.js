const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

module.exports = model(
	'Transaction',
	new Schema(
		{
			hash: {
				type: String,
				required: [true, 'Transaction hash is required'],
				unique: true
			},
			institution: {
				type: ObjectId,
				ref: 'Institution',
				required: [true, 'Institution is required']
			},
			user: {
				type: ObjectId,
				ref: 'User',
				required: [true, 'User is required']
			},
			status: {
				type: String,
				enum: {
					values: ['pending', 'success', 'failed'],
					message: "'{VALUE}' is not supported transaction status"
				},
				default: 'pending'
			}
		},
		{ timestamps: true }
	)
);
