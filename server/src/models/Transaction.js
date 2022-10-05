const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
    hash: String,
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'Accountant'
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'Member'
    },
    date: String,
    fee: String,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;