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
        required: true,
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
        required: true
    },
    location: String,
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
    participants: [{
        member: {
            type: ObjectId,
            ref: 'Member'
        },
        role: {
            type: String,
            enum: ['Organizer', 'Speaker', 'Guest', 'Volunteer', 'Participant'],
            default: 'Participant',
            required: true
        }
    }],
    requests: [{
        type: ObjectId,
        ref: 'Request'
    }]
});

module.exports = model('Event', eventSchema);