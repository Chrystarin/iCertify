import mongoose, { Schema } from 'mongoose';

const eventSchema = new Schema({
    eventId: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        type: String,
        enum: ['online', 'onsite'],
        // required: true,
    },
    title: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true
    },
    link: String,
    location: String,
    date: {
        start: {
            type: String,
            // required: true
        },
        end: {
            type: String,
            // required: true
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
            type: Schema.Types.ObjectId,
            ref: 'Member'
        },
        role: String
    }]
});

export default mongoose.model('Event', eventSchema);