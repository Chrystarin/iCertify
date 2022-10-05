const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountantSchema = new Schema({
    member: {
        type: Schema.Types.ObjectId,
        ref: 'Member'
    },
    fund: String,
    date: {
        start: String,
        end: String
    },
    isActive: Boolean,
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }]
});

const Accountant = mongoose.model('Accountant', accountantSchema);

module.exports = Accountant;