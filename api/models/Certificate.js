const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const certificateSchema = new Schema({
    certificateId: {
        type: String,
        unique: true,
        required: true
    },
    ipfsCID: {
        type: String,
        unique: true,
        require: true
    },
    nftId: {
        type: Number,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        unique: true,
        required: true
    },
    dateReceived: {
        type: Number,
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

module.exports = model('Certificate', certificateSchema);