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
    location: {
        type: String,
        required: true
    },
    date: {
        start: {
            type: String,
            required: true
        },
        end: {
            type: String,
            required: true
        }
    },
    canClaimDocument: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: {
            values: ['draft', 'active', 'inactive'],
            message: 'Invalid status'
        },
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
            ref: 'Member',
            unique: true
        },
        role: String
    }],
    requests: [{
        type: ObjectId,
        ref: 'Request'
    }]
});

export default mongoose.model('Event', eventSchema);