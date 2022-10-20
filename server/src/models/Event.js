import mongoose, { Schema } from 'mongoose';

const eventSchema = new Schema({
    eventId: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        type: String,
        enum: ['online', 'onsite']
    },
    title: String,
    description: String,
    link: String,
    location: String,
    date: {
        start: String,
        end: String
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
            type: Schema.Types.ObjectId,
            ref: 'Member'
        },
        role: String
    }],
    requests: [{
        type: Schema.Types.ObjectId,
        ref: 'Request'
    }]
});

export default mongoose.model('Event', eventSchema);