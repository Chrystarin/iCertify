const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

module.exports = model(
	'Transaction',
	new Schema(
		{
			hash: {
				type: String,
				unique: true,
				required: true
			},
			institution: {
				type: ObjectId,
				ref: 'Institution',
				required: true
			},
			user: {
				type: ObjectId,
				ref: 'User',
				required: true
			}
		},
		{ timestamps: true }
	)
);
