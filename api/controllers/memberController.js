const Member = require('../models/Member');
const bcrypt = require('bcrypt');
const { ethers } = require('ethers');
const jwt = require('jsonwebtoken');
const { generateNonce, verifySignature } = require('../miscellaneous/tools');
const { UnprocessableRequest, NotFound, Unauthorized } = require('../miscellaneous/errors');

const memberAcceptedEntries = new Set([
    'walletAddress',
    'isPremium',
    'name',
    'about',
    'occupation',
    'contact',
    'location'
]);

const roles = ['admin', 'member']

const loginMember = async (req, res, next) => {
    const { type, credentials } = req.body;

    try {
        if(!(   type        && typeof type === 'string'     && new Set(['email', 'metamask']).has(type)
             && credentials && credentials instanceof Array && credentials.length == 2
        )) throw new UnprocessableRequest();

        if(new Set(credentials).has('')) throw new Unauthorized('Empty fields');

        if(type == 'email') {
            const [email, password] = credentials;

            const member = await Member.findOne({ credentials: { email } }).exec();
            if(!member) throw new NotFound('Member');

            const isMatch = bcrypt.compare(password, member.credentials.password);
            if(!isMatch) throw new Unauthorized('Incorrect credentials');
            
            const token = jwt.sign(
                {
                    id: member._id,
                    walletAddress: member.walletAddress,
                    email,
                    nonce: member.credentials.nonce,
                    createdAt: Date.now()
                },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );

            member.credentials.nonce = generateNonce();
            await member.save();

            // set httpOnly cookie in hearder for the token

            res
                .status(200)
                .cookie({
                    accessToken: token,
                    httpOnly: true,
                    expiresIn: 1 * 1000 * 60 * 60
                })
                .json({
                    message: 'Successfully logged in',
                    userType: req.user,
                    accessToken: token
                });
        }
        /**
         * type: metamask
         * credentials: [walletAddress, signature]
         */
        if(type == 'metamask') {
            const [walletAddress, signature] = credentials;

            const member = await Member.findOne({ walletAddress }).exec();
            if(!member) throw new NotFound('Member');

            verifySignature(signature, walletAddress, member.credentials.nonce);

            const token = jwt.sign(
                {
                    id: member._id,
                    walletAddress,
                    email: member.credentials.email,
                    nonce: member.credentials.nonce,
                    createdAt: Date.now()
                },
                process.env.JWT_SECRET,  
                { expiresIn: '1d' }
            );

            member.credentials.nonce = generateNonce();
            await member.save();

            // set httpOnly cookie in hearder for the token
            res
                .status(200)
                .cookie('access token', token, { httpOnly: true, expiresIn: 1 * 1000 * 60 * 60 })
                .cookie('refresh token', 'this is a refresh token', { httpOnly: true, expiresIn: 1 * 1000 * 60 * 60 })
                .json({
                    message: 'Successfully logged in',
                    userType: req.user,
                    walletAddress: member.walletAddress,
                    accessToken: token,
                    roles: roles
                });
        }
    } catch (error) {
        next(error);
    }    
}

const registerUser = async (req, res, next) => {
    const { walletAddress } = req.body;

    try {
        // Check if valid wallet address
        if(!(  walletAddress
            && typeof walletAddress === 'string'
            && ethers.utils.isAddress(walletAddress)
        )) throw new Unauthorized('Invalid wallet address');

        // Create member
        const member = await Member.create({
            walletAddress: ethers.utils.getAddress(walletAddress)
        });

        res.status(201).json({
            message: 'Wallet address registered',
            walletAddress: member.walletAddress
        });
    } catch (error) {
        next(error)
    }
}

const userExisting = async (req, res, next) => {
    const { walletAddress } = req.params;

    try {
        const member = await Member.findOne({ walletAddress }).exec();
        res.status(200).json({isExisting: !!member});
    } catch (error) {
        next(error);
    }
}

const getNonce = async (req, res, next) => {
    const { walletAddress } = req.params;

    try {
        const member = await Member.findOne({ walletAddress }).exec();
        if(!member) throw new NotFound('Member');

        res.status(200).json({nonce: member.credentials.nonce});
    } catch(error) {
        next(error)
    }
}

const getAllMembers = async (req, res, next) => {
    try {
        const members = await Member
            .find()
            .select(Array.from(memberAcceptedEntries).join(' '))
            .exec();

        res.status(200).json(members);
    } catch (error) {
        next(error)
    }
}

const getMember = async (req, res, next) => {
    const { walletAddress } = req.params;

    try {
        const member = await Member
            .findOne({ walletAddress })
            .select(Array.from(memberAcceptedEntries).join(' '))
            .exec();
        if(!member) throw new NotFound('Member');

        res.status(200).json(member);
    } catch (error) {
        next(error);
    }
}

const updateMember = async (req, res, next) => {
    const { walletAddress } = req.params;
    const {
        isPremium,
        name: { firstName, middleName, lastName, extension },
        about,
        occupation,
        contact: { mobile, telephone },
        location: { barangay, city, province, country }
    } = req.body;

    var obj = {};

    addProperty(isPremium, { isPremium }, 'boolean');
    addProperty(firstName, { name: { firstName } });
    addProperty(middleName, { name: { middleName } });
    addProperty(lastName, { name: { lastName } });
    addProperty(extension, { name: { extension } });
    addProperty(about, { about });
    addProperty(occupation, { occupation })
    addProperty(mobile, { contact: { mobile } });
    addProperty(telephone, { contact: { telephone } });
    addProperty(barangay, { location: { barangay } });
    addProperty(city, { location: { city } });
    addProperty(province, { location: { province } });
    addProperty(country, { location: { country } });

    try {
        const member = await Member.findOne({ walletAddress }).exec();
        if(!member) throw new NotFound('Member');

        Object.assign(member, filterRequestBody(body, member.isStillAccountCreation));
        member.isStillAccountCreation = false;
        await member.save();

        res.sendStatus(204);
    } catch (error) {
        next(error)
    }

    function addProperty(string, output, type = 'string') {
        if(string !== undefined) {
            if(typeof string !== type)
                throw new UnprocessableRequest();
            Object.assign(obj, output);
        }
    }
}

const getJoinedEvents = async (req, res, next) => {
    const { walletAddress } = req.params;

    try {
        const member = await Member
            .findOne({ walletAddress })
            .select('-joinedEvents._id')
            .populate('joinedEvents.event', '-_id eventId title')
            .exec();
        if(!member) throw new NotFound('Member');

        res.status(200).json(member.joinedEvents);
    } catch (error) {
        next(error);
    }
}

const getDocuments = async (req, res, next) => {
    const { walletAddress } = req.params;

    try {
        const member = await Member
            .findOne({ walletAddress })
            .select('-ownedDocuments._id')
            .populate('ownedDocuments', '-_id documentId code details')
            .exec();
        if(!member) throw new NotFound('Member');

        res.status(200).json(member.ownedDocuments);
    } catch (error) {
        next(error);
    }
}

const getRequests = async (req, res, next) => {
    const { walletAddress } = req.params;

    try {
        const member = await Member
            .findOne({ walletAddress })
            .select('-requests._id')
            .populate('requests', '-_id -__v -requestor -event')
            .exec();
        if(!member) throw new NotFound('Member');

        res.status(200).json(member.requests);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    loginMember,
    getNonce,
    getAllMembers,
    getMember,
    updateMember,
    getJoinedEvents,
    getDocuments,
    getRequests,
    registerUser,
    userExisting
}