const Member = require('../models/Member');
const Event = require('../models/Event');
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
require('dotenv/config');

const lorem = {
    lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel sem ac massa condimentum fringilla in ut mi. Suspendisse dapibus maximus fermentum. Vestibulum ac fringilla neque, sed vehicula ipsum. Duis elementum tempus tempus. Phasellus sit amet rutrum urna, nec sodales eros. Nulla id dictum magna. In quis nulla fringilla, dignissim est a, vehicula nunc. Nam semper tristique dapibus. Maecenas hendrerit diam a rutrum dignissim. Nulla sapien leo, mollis id facilisis at, ultrices ut odio. Vivamus viverra vestibulum quam, sed ullamcorper ipsum tincidunt sit amet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    description: function(n) {
        const part = rand(500 - n);
        return this.lorem.substring(part, part + n);
    },
    title: function(n) {
        var part = rand(97 - n);
        return this.lorem
            .match(/\w+/g)
            .map(w => w[0].toUpperCase() + w.substring(1))
            .slice(part, part + n)
            .join(' ');
    }
};

function randomAddress() {
    var walletAddress = '0x';
    while(walletAddress.length < 42) {
        walletAddress += rand(Array.from('01234566789abcdefABCDEF'))
    }
    return walletAddress;
}

function generateName() {
    const firstNames = ['Vivienne', 'Rhiann', 'Benedict', 'Alexa', 'Layan', 'Aiysha', 'Alia', 'Harlee', 'Nicole', 'Aiden'];
    const lastNames = ['Ball', 'Martinez', 'Small', 'Carroll', 'Rubio', 'Savage', 'Knapp', 'Robson', 'Mcdaniel', 'Redman'];
    const extensions = ['Sr.', 'Jr.', 'II', 'III', 'IV', 'V'];

    var obj = {
        firstName: rand(firstNames),
        lastName: rand(lastNames)
    }

    if(rand()) obj.middleName = rand(lastNames.filter(ln => ln !== this.lastName));
    if(rand()) obj.extension = rand(extensions);

    return obj;
}

function generateTags(n) {
    const tags = ['elevator', 'measurement', 'conversation', 'version', 'people', 'woman', 'king', 'classroom', 'education', 'speaker', 'income', 'city', 'proposal', 'software', 'freedom', 'power', 'height', 'climate', 'fact', 'nation'];
    const currentTags = new Set();

    while(currentTags.size < n) currentTags.add(rand(tags.filter(t => !currentTags.has(t))));
    return Array.from(currentTags);
}

function rand(min, max) {
    // True or False
    if(!min && !max) return Math.random() > 0.5;

    // Array
    if(min instanceof Array && !max) return min[rand(min.length)];

    // Number
    return Math.floor(Math.random() * (max ? (max - min + 1) : min)) + (max ? min : 0);
}

mongoose
    .connect(process.env.TEST_MONGO)
    .then(async () => {
        var members = [];
        var events = [];

        for(var i = 0; i < 50; i++) {
            var member = new Member({
                walletAddress: randomAddress(),
                name: generateName()
            });
            await member.save();
            members.push(member);

            if(i < 30) {
                var event = new Event({
                    eventId: nanoid(8),
                    type: rand(['online', 'onsite']),
                    title: lorem.title(rand(3, 7)),
                    description: lorem.description(rand(50, 75)),
                    tags: generateTags(rand(3, 7))
                });
                await event.save();
                events.push(event);
            }
        }

        members.forEach(m => {
            for(var i = 0; i < rand(4, 7); i++) {
                var event = rand(events); 
                var role = rand(['Organizer', 'Speaker', 'Guest', 'Volunteer', 'Participant']);

                m.joinedEvents.push({
                    event: event._id,
                    role
                });

                event.participants.push({
                    member: m._id,
                    role
                });
            }
        });

        members.forEach(async (m) => await m.save());
        events.forEach(async (e) => await e.save());
    })
    .catch(error => console.log(error));