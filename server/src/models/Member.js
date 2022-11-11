import mongoose, { Schema } from 'mongoose';
import { generateNonce } from '../tools.js';
const { ObjectId } = Schema.Types;

const memberSchema = new Schema({
    walletAddress: {
        type: String,
        unique: true,
        index: true,
        required: true,
        lowercase: true,
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
        city: String,
        province: String,
        country: String
    },
    credentials: {
        nonce: {
            type: Number,
            default: generateNonce()
        },
        email: {
            type: String,
            unique: true,
            index: true,
            sparse: true
        },
        password: String

    },
    joinedEvents: [{
        event: {
            type: ObjectId,
            ref: 'Event'
        },
        role: {
            type: String,
            enum: ['Organizer', 'Speaker', 'Guest', 'Volunteer', 'Participant'],
            default: 'Participant'
        }
    }],
    ownedDocuments: [{
        type: ObjectId,
        ref: 'Document'
    }],
    requests: [{
        type: ObjectId,
        ref: 'Request'
    }]
});

export default mongoose.model('Member', memberSchema);