import mongoose, { Schema } from 'mongoose';

const transactionSchema = new Schema({
    hash: {
        type: String,
        unique: true,
        required: true,
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'Accountant',
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
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