const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

module.exports = model(
	'Institution',
	new Schema(
		{
			walletAddress: {
				type: String,
				unique: true,
				required: [true, 'Wallet address is required']
			},
			name: { type: String, required: [true, 'Name is required'] },
			instType: {
				type: String,
				enum: {
					values: ['organization', 'school', 'corporation'],
					message: "'{VALUE}' is not supported as institution type"
				},
				required: [true, 'Institution Type is required']
			},
			email: {
				type: String,
				unique: true,
				required: [true, 'Email is required']
			},
			about: String,
			address: String,
			website: String,
			contactNo: Number,
			photos: { profile: String, cover: String },
			needs: {
				ID: { type: Boolean, default: false },
				membership: { type: Boolean, default: false }
			},
			members: [
				{
					user: {
						type: ObjectId,
						ref: 'User',
						unique: true,
						index: true,
						sparse: true,
						required: [true, 'User id is required']
					},
					idNumber: String,
					joinedAt: { type: Date, default: new Date() }
				}
			],
			docOffers: [
				{
					docId: {
						type: String,
						index: { unique: true, sparse: true },
						required: [true, 'docId is required']
					},
					title: {
						type: String,
						required: [true, 'Title is required']
					},
					description: {
						type: String,
						required: [true, 'Description is required']
					},
					price: {
						type: Number,
						required: [true, 'Price is required']
					},
					requirements: {
						type: String,
						required: [true, 'Requirements is required']
					}
				}
			]
		},
		{ timestamps: true }
	)
);
