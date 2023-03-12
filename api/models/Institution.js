const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

module.exports = model(
	'Institution',
	new Schema(
		{
			insitutionId: {
				type: String,
				required: true,
				unique: true
			},
			walletAddress: { type: String, required: true },
			name: { type: String, required: true },
			members: [
				{
					user: { type: ObjectId, ref: 'User', required: true },
					joinedAt: { type: Date, default: new Date() }
				}
			]
		},
		{ timestamps: true }
	)
);
