const mongoose = require('mongoose');
const { Schema } = mongoose;

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
        title: String,
        description: String,
        txnHash: String,
        dataReceived: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Member'
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;