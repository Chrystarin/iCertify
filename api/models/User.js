const { Schema, model } = require('mongoose');

const createNonce = require('../miscellaneous/createNonce');

module.exports = model(
	'User',
	new Schema(
		{
			walletAddress: {
				type: String,
				unique: true,
				required: true
			},
			name: {
				firstName: { type: String, required: true },
				lastName: { type: String, required: true },
				extension: String
			},
			about: String,
			documents: [
				{
					nftId: {
						type: Number,
						required: true,
						unique: true
					},
					accessCodes: [{ type: String, unique: true }]
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
