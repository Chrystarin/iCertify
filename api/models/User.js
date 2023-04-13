const { Schema, model } = require('mongoose');
const { genAccessCode } = require('../miscellaneous/generateId');

module.exports = model(
	'User',
	new Schema(
		{
			walletAddress: {
				type: String,
				unique: true,
				required: [true, 'Wallet address is required']
			},
			name: {
				firstName: {
					type: String,
					required: [true, 'First name is required']
				},
				middleName: String,
				lastName: {
					type: String,
					required: [true, 'Last name is required']
				}
			},
			email: {
				type: String,
				unique: true,
				required: [true, 'Email is required']
			},
			birthDate: {
				type: Date,
				required: [true, 'Birth date is required']
			},
			address: String,
			contactNo: String,
			photo: String,
			about: String,
			documents: [
				{
					nftId: {
						type: Number,
						index: { unique: true, sparse: true },
						required: [true, 'NFT ID is required']
					},
					codes: [String],
					mode: {
						type: String,
						enum: ['public', 'private'],
						default: 'private'
					}
				}
			]
		},
		{ timestamps: true }
	)
);
