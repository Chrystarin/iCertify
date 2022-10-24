import mongoose, { Schema } from 'mongoose';
const { ObjectId } = Schema.Types;

const requestSchema = new Schema({
    requestId: {
        type: String,
        unique: true,
        required: true
    },
    requestType: {
        type: String,
        enum: ['event', 'document', 'volunteer'],
        required: true
    },
    date: {
        requested: {
            type: required,
            required: true
        },
        completed: {
            type: required,
            required: true
        }
    },
    status: {
        type: String,
        required: true
    },
    requestor: {
        type: ObjectId,
        ref: 'Member',
        required: true
    },
    event: {
        type: ObjectId,
        ref: 'Event',
        required: true
    }
});

export default mongoose.model('Request', requestSchema);