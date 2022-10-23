import mongoose, { Schema } from 'mongoose';
const { ObjectId, Decimal128 } = Schema.Types;

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
        type: String,
        required: true
    },
    fee: {
        type: Decimal128,
        required: true
    },
});

export default mongoose.model('Transaction', transactionSchema);