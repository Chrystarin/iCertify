const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const createNonce = require('../miscellaneous/createNonce');

module.exports = model(
	'Institution',
	new Schema(
		{
			walletAddress: { type: String, unique: true, required: true },
			name: { type: String, required: true },
			members: [
				{
					user: { type: ObjectId, ref: 'User', required: true },
					joinedAt: { type: Date, default: new Date() }
				}
			],
			nonce: {
				type: Number,
				unique: true,
				default: createNonce()
			}
		},
		{ timestamps: true }
	)
);
