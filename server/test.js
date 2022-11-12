import dotenv from 'dotenv';
import express from 'express';
import { ethers } from 'ethers';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateNonce, ipfsClient } from './src/tools.js'

dotenv.config();

const app = express();
app.use(express.json());



const __dirname = path.dirname('./metamaskConnect.html');
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

let users = [
    {
        address: '0x93A4f83BA6A05a0b1f62E86F0e4E62Bc1d1Abe4E',
        nonce: generateNonce()
    },
    {
        address: '0x8B72721DE2E85CC7634801D09448b99dcB66d354',
        nonce: generateNonce()
    },
    {
        address: '0x0fC5966191BC3D9ba775e72b38936433b1F0BF1c',
        nonce: generateNonce()
    }
]

app.get('/:address/nonce', (req, res) => {
    const { address } = req.params;
    const { nonce } = users.filter(u => u.address == address)[0];

    res.status(200).json({ nonce });
})

app.get('/connect', (req, res) => {
    res.sendFile(__dirname + '/test/metamaskConnect.html');
});

app.post('/login', async (req, res) => {

    const { address, signature } = req.body;
    const { nonce } = users.filter(u => u.address == address)[0];
    // console.log(users.filter(u => u.address == address));

    const signerAddress = ethers.utils.verifyMessage('Nonce: ' + nonce, signature);

    if(signerAddress == address) {
        users.find(u => u.address == address).nonce = generateNonce();
        res.status(200).json({ message: "Login success" });
    } else {
        res.status(400).json({ message: "Invalid signer" });
    }
});

import Member from './src/models/Member.js';
import Event from './src/models/Event.js';
import { customAlphabet, nanoid } from 'nanoid';
import mongoose from 'mongoose';
const randomAddress = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 40);

const occupations = ['Drafter', 'Farmer', 'Speech-Language Pathologist', 'HR Specialist', 'Firefighter', 'Chemist', 'Recreation & Fitness Worker', 'Landscaper & Groundskeeper', 'High School Teacher', 'Hairdresser'];

const test = async () => {
    let members = [];
    let events = [];
    let accountants = [];
    let documents = [];
    let requests = [];
    let transactions = [];

    // Create 50 members
    let name;
    while(members.length < 10) {
        name = generateName()
        members.push(
            await Member.create({
                walletAddress: '0x'+randomAddress(),
                isPremium: rand(),
                name,
                about: loremDescription(rand(50, 70)),
                occupation: rand(occupations)
            })
        )
    }

    // Create 30 events
    while(events.length < 10) {
        events.push(
            await Event.create({
                eventId: nanoid(8),
                type: rand(['online', 'onsite']),
                title: loremTitle(rand(3, 7)),
                description: loremDescription(rand(30, 50)),
                link: 'https://bit.ly/' + nanoid(6),
                date: {
                    start: new Date(Date.now() + Math.random() * (1e+10)).getTime(),
                    end: new Date(Date.now() + Math.random() * (1e+10) * 2).getTime()
                },
                tags: generateTags(rand(4, 8))
            })
        )
    }

    // Assign participants to events
    var participants;
    for(var event of events) {
        participants = new Set()
        
        for(var i = 0; i < rand(4, 7); i++) {
            participants.add({
                mid: rand(members.filter(m => !participants.has(m._id)))._id,
                role: rand(['Organizer', 'Speaker', 'Guest', 'Volunteer', 'Participant'])
            })
        }

        participants.forEach(({mid, role}) => {
            event.participants.push({
                member: mid,
                role
            });

            members
                .find(m => m._id === mid)
                .joinedEvents.push({
                    event: event._id,
                    role
                });
        })
    }

    members.forEach(async (m) => await m.save())
    events.forEach(async (e) => await e.save())
}
test();

import { readFileSync } from 'fs';
import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client';
const ipfsTest = async () => {
    // console.log(auth);
    const auth = 'Basic ' + Buffer.from('2Gwp7Bjzsk2g7lH97Rskh0MenoA:542eafe1b88b83c6f8fba3bfd4ca026b').toString('base64')
    const client = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
            authorization: 'Basic ' + Buffer.from(process.env.INFURA_IPFS_ID + ':' + process.env.INFURA_IPFS_SECRET).toString('base64')
            // authorization: 'Basic ' + (INFURA_IPFS_ID + ':' + INFURA_IPFS_SECRET).toString('base64')
        }
    });

    // console.log(ipfsClient)
    
    try {
        const sampleTextBuffer = readFileSync('addresses.txt');
        const jsonBuffer = JSON.stringify(sampleTextBuffer)
        console.log(jsonBuffer)
        console.log(JSON.parse(jsonBuffer))
        // console.log(Buffer.from(JSON.parse(jsonBuffer)));
        console.log({sampleTextBuffer})
        // const data = await ipfsClient.add(readFileSync('addresses.txt'));
        // console.log(data);
    } catch (error) {
        console.log(error);
    }
    // console.log(auth);
    // // console.log(Buffer.from(auth, 'base64'));

    // try {
    //     await ipfsClient.add(readFileSync('addresses.txt'));
    // } catch (error) {
    //     console.log(error.name, error.message);
    // }
}
// ipfsTest();

function generateName() {
    const firstNames = ['Vivienne', 'Rhiann', 'Benedict', 'Alexa', 'Layan', 'Aiysha', 'Alia', 'Harlee', 'Nicole', 'Aiden'];
    const lastNames = ['Ball', 'Martinez', 'Small', 'Carroll', 'Rubio', 'Savage', 'Knapp', 'Robson', 'Mcdaniel', 'Redman'];
    const extensions = ['Sr.', 'Jr.', 'II', 'III', 'IV', 'V'];

    var name = {};
    name.firstName = rand(firstNames);
    name.lastName = rand(lastNames);
    if(rand())
        name.middleName = rand(lastNames.filter(ln => ln !== name.lastName));
    if(rand())
        name.extension = rand(extensions);
    return name;
}

function generateTags(n) {
    const tags = ['elevator', 'measurement', 'conversation', 'version', 'people', 'woman', 'king', 'classroom', 'education', 'speaker', 'income', 'city', 'proposal', 'software', 'freedom', 'power', 'height', 'climate', 'fact', 'nation'];
    let currentTags = new Set();
    while(currentTags.size < n) {
        currentTags.add(rand(tags.filter(t => !currentTags.has(t))))
    }
    return Array.from(currentTags);
}

function rand(min, max) {
    if(!min && !max) return Math.random() > 0.5;

    if(min instanceof Array) return min[rand(min.length)];

    return Math.floor(Math.random() * (max ? (max - min + 1) : min)) + (max ? min : 0);
}

function loremDescription(n) {
    var part = rand(500 - n);
    return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel sem ac massa condimentum fringilla in ut mi. Suspendisse dapibus maximus fermentum. Vestibulum ac fringilla neque, sed vehicula ipsum. Duis elementum tempus tempus. Phasellus sit amet rutrum urna, nec sodales eros. Nulla id dictum magna. In quis nulla fringilla, dignissim est a, vehicula nunc. Nam semper tristique dapibus. Maecenas hendrerit diam a rutrum dignissim. Nulla sapien leo, mollis id facilisis at, ultrices ut odio. Vivamus viverra vestibulum quam, sed ullamcorper ipsum tincidunt sit amet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.'
        .substring(part, part + n);
}

function loremTitle(n) {
    var part = rand(97 - n);
    return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel sem ac massa condimentum fringilla in ut mi. Suspendisse dapibus maximus fermentum. Vestibulum ac fringilla neque, sed vehicula ipsum. Duis elementum tempus tempus. Phasellus sit amet rutrum urna, nec sodales eros. Nulla id dictum magna. In quis nulla fringilla, dignissim est a, vehicula nunc. Nam semper tristique dapibus. Maecenas hendrerit diam a rutrum dignissim. Nulla sapien leo, mollis id facilisis at, ultrices ut odio. Vivamus viverra vestibulum quam, sed ullamcorper ipsum tincidunt sit amet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.'
        .match(/\w+/g)
        .map(w => w[0].toUpperCase() + w.substring(1))
        .slice(part, part + n)
        .join(' ');
}

// Run server
// mongoose
//     .connect(process.env.TEST_MONGO)
//     .then(() => {
        // Run server
        app.listen(3125, err => {
            if(err) return console.log('Error', err);
            console.log('Connected to database\nListening on port', 3125);
        });
    // })
    // .catch(error => console.log(error.message));
