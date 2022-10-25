import mongoose, { Schema } from 'mongoose';
const { ObjectId, Decimal128 } = Schema.Types;

const accountantSchema = new Schema({
    member: {
        type: ObjectId,
        ref: 'Member',
        required: true,
        unique: true
    },
    fund: {
        type: Decimal128,
        default: 0
    },
    date: {
        start: {
            type: String,
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

export default mongoose.model('Accountant', accountantSchema);