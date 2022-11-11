import mongoose, { Schema } from 'mongoose';
const { ObjectId } = Schema.Types;

const eventSchema = new Schema({
    eventId: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        type: String,
        enum: {
            values: ['online', 'onsite'],
            message: 'Invalid event type'
        },
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
    canClaimDocument: {
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
            default: 'Participant'
        }
    }],
    requests: [{
        type: ObjectId,
        ref: 'Request'
    }]
});

export default mongoose.model('Event', eventSchema);