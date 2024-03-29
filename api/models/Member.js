const { Schema, model } = require('mongoose');
const { generateNonce } = require('../miscellaneous/tools');
const { ObjectId } = Schema.Types;

const memberSchema = new Schema({
	walletAddress: {
		type: String,
		unique: true,
		required: true
	},
	isPremium: {
		type: Boolean,
		default: false
	},
	name: {
		firstName: String,
		middleName: String,
		lastName: String,
		extension: String
	},
	about: String,
	occupation: String,
	contact: {
		mobile: String,
		telephone: String
	},
	location: {
		city: String,
		province: String,
		country: String
	},
    nonce: {
        type: Number,
        default: generateNonce()
    },
	joinedEvents: [
		{
			event: { type: ObjectId, ref: 'Event' },
			role: {
				type: String,
				enum: [
					'Organizer',
					'Speaker',
					'Guest',
					'Volunteer',
					'Participant'
				],
				default: 'Participant'
			}
		}
	],
	ownedCertificates: [
		{
			type: ObjectId,
			ref: 'Certificate'
		}
	]
});

module.exports = model('Member', memberSchema);
