const { Schema, model } = require('mongoose');

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
				extension: { type: String, required: true }
			},
			about: { type: String, required: true },
			documents: [
				{
					nftId: {
						type: Number,
						required: true,
						unique: true
					},
					accessCodes: [{ type: String, unique: true }]
				}
			]
		},
		{ timestamps: true }
	)
);
