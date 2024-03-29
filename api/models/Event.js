const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const eventSchema = new Schema({
	eventId: {
		type: String,
		unique: true,
		required: true
	},
	type: {
		type: String,
		enum: ['online', 'onsite'],
		default: 'online',
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: function () {
            console.log('link:', this.type)
			return this.type == 'online';
		}
	},
	location: {
		type: String,
		required: function () {
            console.log('location:', this.type)
			return this.type == 'onsite';
		}
	},
	date: {
		start: {
			type: Number,
			required: true
		},
		end: {
			type: Number,
			required: true
		}
	},
	canClaimCertificate: {
		type: Boolean,
		default: false
	},
	status: {
		type: String,
		enum: ['draft', 'active', 'inactive'],
		default: 'draft'
	},
	isAcceptingVolunteer: {
		type: Boolean,
		default: false
	},
	tags: [String],
	regularPrice: {
		type: Number,
		default: 0
	},
	premiumPrice: {
		type: Number,
		default: 0
	},
	participants: [
		{
			member: {
				type: ObjectId,
				ref: 'Member'
			},
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
			},
			certificateProcessed: {
				type: Boolean,
				default: false
			}
		}
	],
	volunteerRequests: [
		{
			type: ObjectId,
			ref: 'Member'
		}
	]
});

module.exports = model('Event', eventSchema);
