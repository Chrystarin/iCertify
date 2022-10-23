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
        required: true,
        enum: ['online', 'onsite']
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
        role: String
    }],
    requests: [{
        type: ObjectId,
        ref: 'Request'
    }]
});

export default mongoose.model('Event', eventSchema);