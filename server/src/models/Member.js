import mongoose, { Schema } from 'mongoose';
import { generateNonce } from '../tools.js';

const memberSchema = new Schema({
    walletAddress: {
        type: String,
        unique: true,
        required: true
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    name: {
        firstName: String,
        middleName: String,
        lastName: String,
        extension: String
    },
    about: String,
    occupation: String,
    contact: {
        mobile: String,
        telephone: String
    },
    location: {
        barangay: String,
        municipality: String,
        country: String
    },
    credentials: {
        nonce: {
            type: Number,
            default: generateNonce()
        },
        email: {
            type: String,
            unique: true
        },
        password: String

    },
    joinedEvents: [{
        event: {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        },
        role: String
    }],
    ownedDocuments: [{
        type: Schema.Types.ObjectId,
        ref: 'Document'
    }],
    requests: [{
        type: Schema.Types.ObjectId,
        ref: 'Request'
    }]
});

export default mongoose.model('Member', memberSchema);