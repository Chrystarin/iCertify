import Member from '../models/Member.js'
import bcrypt from 'bcrypt';
import createToken from '../tools/createToken.js';
import { ethers } from 'ethers'

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
        res.status(400).json({ error: 'Invalid login method' });
    
    // Check if credentials are valid
    if(credentials.length != 2)
        res.status(400).json({ error: 'Invalid credentials parameters' });
    
    try {
        // Login type: email
        if(type == 'email') {
            const email = credentials[0];
            const password = credentials[1];

            // Check if credentials are not empty
            if(email == '' || password == '')
                throw Error('Please fill empty fields');

            // Find if there is an existing member with the given email
            const member = await Member
                .findOne({ email })
                .select('walletAddress')
                .exec();

            // Member is not registered yet, throw error
            if(!member) throw Error('Cannot find your account.');

            /* Member Login */

            // Match password
            const isMatch = await bcrypt.compare(password, member.password);

            // If not match, throw error
            if(!isMatch) throw Error('Incorrect credentials.');
            
            // Create jwt token
            const token = createToken(member);

            res.status(200).json({ email, token });
        }

        // Login type: metamask
        if(type == 'metamask') {
            const walletAddress = credentials[0];
            const signature = credentials[1];

            // Find if there is an existing member with the given wallet address
            //      If there is, get that member
            //      Otherwise, register new member
            const { _id } = await Member.findOne({ walletAddress }).exec() ||
                            await Member.create({ walletAddress });
            
            // Create jwt token
            const token = createToken({ _id, walletAddress });

            res.status(200).json({ walletAddress, token });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }    
}

const udpateProfile = async (req, res) => {
    
}

const updateCredentials = async (req, res) => {

}



export {
    loginMember,
    udpateProfile,
    updateCredentials
}