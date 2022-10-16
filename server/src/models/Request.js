import mongoose, { Schema } from 'mongoose';

const requestSchema = new Schema({
    requestType: {
        type: String,
        enum: ['event', 'document', 'volunteer'],
        required: true
    },
    requestor: {
        type: Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    date: {
        requested: String,
        completed: String
    },
    status: String
});

export default mongoose.model('Request', requestSchema);