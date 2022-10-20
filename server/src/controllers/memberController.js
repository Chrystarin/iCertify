import Member from '../models/Member.js'
import bcrypt from 'bcrypt';
import { ethers } from 'ethers'
import { createToken, generateNonce } from '../tools.js';

const loginMember = async (req, res) => {
    /**
     * Structure:
     * {
     *      type: <login type: [email-password, metamask]>,
     *      credentials: [<[email, address]>, <[password, signature]>]
     * }
     */
    const loginMethodCode = new Set(['email', 'metamask']);
    const { type, credentials } = req.body;

    // Check if login type is valid
    if(!loginMethodCode.has(type))
        res.status(403).json({ error: 'Invalid login method' });
    
    // Check if credentials are valid
    if(credentials.length != 2)
        res.status(403).json({ error: 'Invalid credentials parameters' });
    
    try {
        // Login type: email
        if(type == 'email') {
            const email = credentials[0];
            const password = credentials[1];

            // Check if credentials are not empty
            if(email == '' || password == '')
                throw Error('Please fill empty fields');

            // Find if there is an existing member with the given email
            const member = await Member.findOne({ email }).exec();

            // Member is not registered yet, throw error
            if(!member) throw Error('Cannot find your account.');

            /* Member Login */

            // Match password
            const isMatch = await bcrypt.compare(password, member.password);

            // If not match, throw error
            if(!isMatch) throw Error('Incorrect credentials.');
            
            // Create jwt token
            const token = createToken(member._id);

            res.status(200).json({ email, token });
        }

        // Login type: metamask
        if(type == 'metamask') {
            const walletAddress = credentials[0];
            const signature = credentials[1];

            // Find if there is an existing member with the given wallet address
            //      If there is, get that member
            //      Otherwise, register new member
            const member = await Member.findOne({ walletAddress }).exec() ||
                           await Member.create({ walletAddress });            

            // Get the signer address of the signature with the message
            const signerAddress = await ethers.utils.verifyMessage('Nonce: ' + member.credentials.nonce, signature);
            if(signerAddress !== walletAddress) throw Error('Invalid signer.');

            // Update the nonce
            member.credentials.nonce = generateNonce();
            await member.save()

            // Create jwt token
            const token = createToken({ _id: member._id, walletAddress });

            res.status(200).json({ walletAddress, token });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }    
}

const getNonce = async (req, res) => {
    const { walletAddress } = req.params;

    try {
        // Find member
        const member = await Member.findOne({ walletAddress }).exec();

        if(!member) throw Error('Member not existing.');

        res.status(200).json({ nonce: member.credentials.nonce });
    } catch(error) {
        res.status(400).json({ error: error.message });
    }
}

const getAllMembers = async (req, res) => {
    
}

const getMember = async (req, res) => {

}

const updateMember = async (req, res) => {

}

const setPremium = async (req, res) => {

}

const getJoinedEvents = async (req, res) => {

}

const getDocuments = async (req, res) => {

}

const getRequests = async (req, res) => {

}

export {
    loginMember,
    getNonce,
    getAllMembers,
    getMember,
    updateMember,
    setPremium,
    getJoinedEvents,
    getDocuments,
    getRequests
}