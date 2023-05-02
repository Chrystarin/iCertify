const { Schema, model } = require('mongoose');
const { ObjectId, Mixed } = Schema.Types;

module.exports = model(
	'Institution',
	new Schema(
		{
			walletAddress: {
				type: String,
				required: [true, 'Wallet address is required'],
				unique: true
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
				required: [true, 'Email is required'],
				unique: true
			},
			about: String,
			address: String,
			website: String,
			contactNo: String,
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
						required: [true, 'User id is required'],
						validate: {
							validator: function (value) {
								return !this.members?.find(({ user }) =>
									user.equals(value)
								);
							},
							message: 'User already a member'
						}
					},
					idNumber: {
						type: String,
						validate: {
							validator: function (value) {
								return !this.members?.find(
									({ idNumber }) => idNumber == value
								);
							},
							message:
								'ID Number is already registered by another user'
						}
					},
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
			],
			payments: [
				{
					type: {
						type: String,
						required: [true, 'Payment Type is required'],
						enum: {
							values: ['bank', 'ewallet', 'otc'],
							message: 'Payment type is not supported'
						}
					},
					paymentId: {
						type: String,
						required: [true, 'Payment ID is required'],
						index: { unique: true, sparse: true }
					},
					details: {
						type: Mixed,
						required: [true, 'Payment Details is required']
					}
				}
			]
		},
		{ timestamps: true }
	)
);
