const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const accountantSchema = new Schema({
    member: {
        type: ObjectId,
        ref: 'Member',
        required: true,
        unique: true
    },
    fund: {
        type: Number,
        default: 0
    },
    date: {
        start: {
            type: Number,
            default: Date.now()
        },
        end: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    transactions: [{
        type: ObjectId,
        ref: 'Transaction'
    }]
});

module.exports = model('Accountant', accountantSchema);