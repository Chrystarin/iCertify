require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { Schema } =  mongoose;

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/test', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connected to database'))
    .catch(err => console.log(err));

const memberSchema = new Schema({
    walletAddress: {
        type: String,
        unique: true,
        requried: true
    },
    profile: {
        name: String
    },
    eventsJoined: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }]
});
const Member = mongoose.model('Member', memberSchema);

const eventSchema = new Schema({
    eventId: {
        type: String,
        unique: true,
        required: true
    },
    info: {
        name: String
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'Member'
    }]
});
const Event = mongoose.model('Event', eventSchema);

// const member1 = new Member({
//     walletAddress: '0x8B72721DE2E85CC7634801D09448b99dcB66d354',
//     profile: {
//         name: 'Member 1'
//     }
// });
// member1.save(err => {
//     if (err) {
//         console.log('Member failed save');
//         return;
//     };
//     console.log('Member saved');
// });

// const event1 = new Event({
//     eventId: 'event1',
//     info: {
//         name: 'Event 1'
//     }
// });
// event1.save(err => {
//     if (err) {
//         console.log('Event failed save');
//         return;
//     };
//     console.log('Event saved');
// });


const testRun = async() => {
    const member1 = await Member.findOne({ profile: {name: 'Member 1'} }).populate('eventsJoined');
    const event1 = await Event.findOne({ walletAddress: '0x8B72721DE2E85CC7634801D09448b99dcB66d354' }).populate('participants');

    console.log(member1);
    // console.log(event1);

    // add participant to event
    // await Event.findOneAndUpdate(
    //     { eventId: 'event1' },
    //     { $push: { participants: member1._id } },
    // );

    // add event to member's joined event
    // await Member.findOneAndUpdate(
    //     { walletAddress: '0x8B72721DE2E85CC7634801D09448b99dcB66d354' },
    //     { $push: { eventsJoined: event1._id } }
    // );
}
testRun();

// Routes
app.use('/login', require('./src/routes/login'));

// Run local server
app.listen(process.env.PORT || 3000, err => {
    if(err) return console.log('Error', err);
    console.log(`Listening on port ${ process.env.PORT }`);
});