import mongoose, { Schema } from 'mongoose';

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
    details: {
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
        }
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    }
});

export default mongoose.model('Document', documentSchema);