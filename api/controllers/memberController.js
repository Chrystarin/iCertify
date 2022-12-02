const Member = require('../models/Member');
const bcrypt = require('bcrypt');
const { ethers } = require('ethers');
const jwt = require('jsonwebtoken');
const { filterBody, generateNonce, verifySignature } = require('../miscellaneous/tools');
const { UnprocessableEntity, NotFoundError, Unauthorized } = require('../miscellaneous/errors');

const memberAcceptedEntries = new Set([
    'walletAddress',
    'isPremium',
    'name',
    'about',
    'occupation',
    'contact',
    'location'
]);

const loginMember = async (req, res, next) => {
    try {
        const { type, credentials } = req.body;

        if(!(   type
             && credentials
             && typeof type === 'string'
             && credentials instanceof Array
             && new Set(['email', 'metamask']).has(type)
             && credentials.length == 2
        )) throw new UnprocessableEntity();

        if(!(credentials[0] && credentials[1])) throw new Unauthorized('Invalid fields');

        if(type == 'email') {
            const [email, password] = credentials;

            const member = await Member.findOne({ credentials: { email } }).exec();
            if(!member) throw new NotFoundError('Member');

            const isMatch = bcrypt.compare(password, member.credentials.password);
            if(!isMatch) throw new Unauthorized('Incorrect credentials');
            
            const token = jwt.sign(
                {
                    _id: member._id,
                    walletAddress: member.walletAddress
                },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );

            res.status(200).json({ email, token });
        }
        /**
         * type: metamask
         * credentials: [walletAddress, signature]
         */
        if(type == 'metamask') {
            const [walletAddress, signature] = credentials;

            const member = await Member.findOne({ walletAddress }).exec();
            if(!member) throw new NotFoundError('Member');

            verifySignature(signature, walletAddress, member.credentials.nonce);

            member.credentials.nonce = generateNonce();
            await member.save()

            const token = jwt.sign(
                {
                    _id: member._id,
                    walletAddress
                },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );

            res.status(200).json({ walletAddress, token });
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
        )) throw new Unauthorized();

        // Create member
        const member = await Member.create({
            walletAddress: ethers.utils.getAddress(walletAddress)
        });

        res.status(204);
    } catch (error) {
        next(error)
    }
}

const userExisting = async (req, res, next) => {
    const { walletAddress } = req.params;

    try {
        const member = await Member.findOne({ walletAddress }).exec();
        if(!member) return res.status(200).json({isExisting: false});

        res.status(200).json({isExisting: true});
    } catch (error) {
        next(error);
    }
}

const getNonce = async (req, res, next) => {
    const { walletAddress } = req.params;

    try {
        const member = await Member.findOne({ walletAddress }).exec();
        if(!member) throw new NotFoundError('Member');

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
        if(!member) throw new NotFoundError('Member');

        res.status(200).json(member);
    } catch (error) {
        next(error);
    }
}

const updateMember = async (req, res, next) => {
    const { walletAddress } = req.params;

    try {
        const member = await Member.findOne({ walletAddress }).exec();
        if(!member) throw new NotFoundError('Member');

        Object.assign(member, filterBody(memberAcceptedEntries, req.body));
        await member.save();

        res.sendStatus(204);
    } catch (error) {
        next(error)
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
        if(!member) throw new NotFoundError('Member');

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
        if(!member) throw new NotFoundError('Member');

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
        if(!member) throw new NotFoundError('Member');

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