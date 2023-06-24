const { Schema, model } = require('mongoose');
const { ObjectId, Mixed, Decimal128 } = Schema.Types;

module.exports = model(
	'Institution',
	new Schema(
		{
			walletAddress: {
				type: String,
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
				required: [true, 'Email is required'],
				unique: true
			},
            transaction: {
                hash: {
                    type: String,
                    required: [true, 'Transaction hash is required'],
                    unique: true
                },
                status: {
                    type: String,
                    enum: {
                        values: ['pending', 'success', 'failed'],
                        message: "'{VALUE}' is not supported as transaction status"
                    },
                    default: 'pending'
                }
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
								return !this.members?.some(({ user }) =>
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
								return !this.members?.some(
									({ idNumber }) => idNumber === value
								);
							},
							message:
								'ID Number is already registered by another user'
						}
					},
					joinedAt: { type: Date, default: new Date() }
				}
			],
            blocked: [
                {
                    type: ObjectId,
                    ref: 'User'
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
                    purpose: {
                        type: String,
                        required: [true, 'Purpose is required']
                    },
					price: {
						type: Decimal128,
						required: [true, 'Price is required']
					},
					requirements: {
						type: String,
						required: [true, 'Requirements is required']
					},
                    status: {
                        type: String,
                        enum: {
                            values: ['active', 'inactive'],
                            message: "'{VALUE}' is not supported as document offer status"
                        },
                        default: 'active'
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
