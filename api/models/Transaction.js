const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const transactionSchema = new Schema({
    hash: {
        type: String,
        unique: true,
        required: true,
    },
    event: {
        type: ObjectId,
        ref: 'Event',
        required: true
    },
    sender: {
        type: ObjectId,
        ref: 'Accountant',
        required: true
    },
    receiver: {
        type: ObjectId,
        ref: 'Member',
        required: true
    },
    date: {
        type: Number,
        default: Date.now()
    },
    fee: {
        type: Number,
        required: true
    }
});

module.exports = model('Transaction', transactionSchema);