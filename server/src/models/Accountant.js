import mongoose, { Schema } from 'mongoose';

const accountantSchema = new Schema({
    member: {
        type: Schema.Types.ObjectId,
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
            required: true
        },
        end: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }]
});

export default mongoose.model('Accountant', accountantSchema);