const mongoose = require('mongoose');
const { Schema } = mongoose;

const participantSchema = new Schema({
    member: {
        type: Schema.Types.ObjectId,
        ref: 'Member'
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    role: String
});

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;