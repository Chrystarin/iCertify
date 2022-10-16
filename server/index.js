import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

// Route imports
// import eventRoute from './src/routes/event.js';
import memberRoute from './src/routes/member.js';

dotenv.config();

const app = express();
app.use(express.json());

// Routes
// app.use('/api/events', eventRoute);
// app.use('/api/members', memberRoute);

/* TEST */

import Member from './src/models/Member.js';
import Event from './src/models/Event.js';
import { nanoid } from 'nanoid';
import generateNonce from './src/tools/generateNonce.js';

const test = async () => {
    // // Create members
    // const member1 = await Member.create({ walletAddress: '0x8B72721DE2E85CC7634801D09448b99dcB66d354' });
    // const member2 = await Member.create({ walletAddress: '0xF432061cf7E60129b8D822b1a2037Ca4ace0872C' });
    // const member3 = await Member.create({ walletAddress: '0xe99eAe462cd1F2a22f8c3403623B66ec8aAE8904' });
    // const member4 = await Member.create({ walletAddress: '0x53Ce82317C57eF4cFa2b2e27361eb2F07C0BA626' });
    // const member5 = await Member.create({ walletAddress: '0xE99568000e344a00D4046AF50Bd314f6aE6d1C01' });
    // const member6 = await Member.create({ walletAddress: '0x04a48d09d2658eF7F024C9972E26BEd7dB02A706' });
    
    // // Create events
    // const event1 = await Event.create({ eventId: nanoid(8) });
    // const event2 = await Event.create({ eventId: nanoid(8) });
    // const event3 = await Event.create({ eventId: nanoid(8) });
    // const event4 = await Event.create({ eventId: nanoid(8) });

    // // Event 1
    // await Event.findByIdAndUpdate(event1._id, { $push: { participants: { role: 'Organizer', member: member1._id } } });
    // await Event.findByIdAndUpdate(event1._id, { $push: { participants: { role: 'Watcher', member: member2._id } } });
    // await Event.findByIdAndUpdate(event1._id, { $push: { participants: { role: 'Listener', member: member3._id } } });

    // // Event 2
    // await Event.findByIdAndUpdate(event2._id, { $push: { participants: { role: 'Organizer', member: member3._id } } });
    // await Event.findByIdAndUpdate(event2._id, { $push: { participants: { role: 'Watcher', member: member4._id } } });
    // await Event.findByIdAndUpdate(event2._id, { $push: { participants: { role: 'Listener', member: member5._id } } });

    // // Event 3
    // await Event.findByIdAndUpdate(event3._id, { $push: { participants: { role: 'Organizer', member: member5._id } } });
    // await Event.findByIdAndUpdate(event3._id, { $push: { participants: { role: 'Watcher', member: member6._id } } });
    // await Event.findByIdAndUpdate(event3._id, { $push: { participants: { role: 'Listener', member: member1._id } } });

    // // Event 4
    // await Event.findByIdAndUpdate(event4._id, { $push: { participants: { role: 'Organizer', member: member2._id } } });
    // await Event.findByIdAndUpdate(event4._id, { $push: { participants: { role: 'Watcher', member: member4._id } } });
    // await Event.findByIdAndUpdate(event4._id, { $push: { participants: { role: 'Listener', member: member6._id } } });

    // // Member 1
    // await Member.findByIdAndUpdate(member1._id, { $push: { joinedEvents: { role: 'Organizer', event: event1._id } } });
    // await Member.findByIdAndUpdate(member1._id, { $push: { joinedEvents: { role: 'Listener', event: event3._id } } });

    // // Member 2
    // await Member.findByIdAndUpdate(member2._id, { $push: { joinedEvents: { role: 'Watcher', event: event1._id } } });
    // await Member.findByIdAndUpdate(member2._id, { $push: { joinedEvents: { role: 'Organizer', event: event4._id } } });

    // // Member 3
    // await Member.findByIdAndUpdate(member3._id, { $push: { joinedEvents: { role: 'Organizer', event: event2._id } } });
    // await Member.findByIdAndUpdate(member3._id, { $push: { joinedEvents: { role: 'Listener', event: event1._id } } });

    // // Member 4
    // await Member.findByIdAndUpdate(member4._id, { $push: { joinedEvents: { role: 'Watcher', event: event2._id } } });
    // await Member.findByIdAndUpdate(member4._id, { $push: { joinedEvents: { role: 'Watcher', event: event4._id } } });

    // // Member 5
    // await Member.findByIdAndUpdate(member5._id, { $push: { joinedEvents: { role: 'Organizer', event: event3._id } } });
    // await Member.findByIdAndUpdate(member5._id, { $push: { joinedEvents: { role: 'Listener', event: event2._id } } });

    // // Member 6
    // await Member.findByIdAndUpdate(member6._id, { $push: { joinedEvents: { role: 'Watcher', event: event3._id } } });
    // await Member.findByIdAndUpdate(member6._id, { $push: { joinedEvents: { role: 'Listener', event: event4._id } } });

    // const member = await Member
    //     .findOne()
    //     .populate({ path: 'joinedEvents.event', select: 'eventId' })
    //     .select('walletAddress joinedEvents')
    //     .exec()

    // console.log(member);
    // console.log(generateNonce(5));
}

// test();

/* TEST */

// Connect to database
mongoose
    .connect(process.env.TEST_MONGO)
    .then(() => {
        // Run server
        app.listen(process.env.PORT, err => {
            if(err) return console.log('Error', err);
            console.log('Connected to database\nListening on port', process.env.PORT);
        });
    })
    .catch(error => console.log(error.message));

