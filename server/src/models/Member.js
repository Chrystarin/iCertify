const mongoose = require('mongoose');
const { Schema } = mongoose;

const memberSchema = new Schema({
    walletAddress: {
        type: String,
        unique: true,
        required: true
    },
    profile: {
        isPremium: Boolean,
        name: {
            firstName: String,
            middleInitial: String,
            lastName: String,
            extension: String
        },
        about: String,
        occupation: String,
        contact: {
            mobile: String,
            telephone: String
        },
        email: String,
        location: {
            houseNumber: String,
            streetName: String,
            barangay: String,
            municipality: String
        }
    },
    joinedEvents: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    interestedEvents: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    ownedDocuments: {
        type: Schema.Types.ObjectId,
        ref: 'Document'
    }
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;