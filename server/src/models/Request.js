const mongoose = require('mongoose');
const { Schema } = mongoose;

const requestSchema = new Schema({
    requestType: {
        type: String,
        default: ['event', 'document', 'volunteer']
    },
    requestor: {
        type: Schema.Types.ObjectId,
        ref: 'Member'
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    date: {
        requested: String,
        completed: String
    },
    status: String
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;