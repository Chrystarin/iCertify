import mongoose, { Schema } from 'mongoose';
const { ObjectId } = Schema.Types;

const documentSchema = new Schema({
    documentId: {
        type: String,
        unique: true,
        required: true
    },
    code: {
        type: String,
        unique: true,
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
    txnHash: {
        type: String,
        unique: true,
        required: true
    },
    dateReceived: {
        type: String,
        required: true
    },
    owner: {
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

export default mongoose.model('Document', documentSchema);