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
        index: true,
        sparse: true
    },
    nftId: {
        type: Number,
        unique: true,
        index: true,
        sparse: true
    },
    title: String,
    hash: {
        type: String,
        unique: true,
        index: true,
        sparse: true
    },
    dateReceived: Number,
    owner: {
        type: ObjectId,
        ref: 'Member'
    },
    event: {
        type: ObjectId,
        ref: 'Event'
    }
});

module.exports = model('Certificate', certificateSchema);