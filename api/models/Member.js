const { Schema, model } = require('mongoose');
const { generateNonce } = require('../miscellaneous/tools');
const { ObjectId } = Schema.Types;

const memberSchema = new Schema({
    walletAddress: {
        type: String,
        unique: true,
        required: true
    },
    isStillAccountCreation: {
        type: Boolean,
        default: true
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    name: {
        firstName: {
            type: String,
            default: ''
        },
        middleName:  {
            type: String,
            default: ''
        },
        lastName:  {
            type: String,
            default: ''
        },
        extension:  {
            type: String,
            default: ''
        }
    },
    about:  {
        type: String,
        default: ''
    },
    occupation:  {
        type: String,
        default: ''
    },
    contact: {
        mobile:  {
            type: String,
            default: ''
        },
        telephone:  {
            type: String,
            default: ''
        }
    },
    location: {
        barangay:  {
            type: String,
            default: ''
        },
        city:  {
            type: String,
            default: ''
        },
        province:  {
            type: String,
            default: ''
        },
        country:  {
            type: String,
            default: ''
        },
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
        password:  {
            type: String,
            default: ''
        },

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
        ref: 'Certificate'
    }],
    requests: [{
        type: ObjectId,
        ref: 'Request'
    }]
});

module.exports = model('Member', memberSchema);