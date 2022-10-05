const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
    eventId: {
        type: String,
        unique: true,
        required: true
    },
    details: {
        type: String,
        link: String,
        title: String,
        description: String,
        contact: {
            mobile: String,
            telephone: String
        },
        email: String,
        location: String,
        date: {
            start: String,
            end: String
        },
        canClaimDocument: Boolean,
        status: String,
        isAcceptingVolunteer: Boolean,
        tags: [String]
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'Member'
    }]
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;