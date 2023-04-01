const { Schema, model } = require('mongoose');

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
						required: [true, 'NFT ID is required'],
						unique: true,
                        index: true, 
                        sparse: true
					},
					accessCodes: [{ 
                        type: String,
						unique: true,
                        index: true, 
                        sparse: true
                    }]
				}
			]
		},
		{ timestamps: true }
	)
);
