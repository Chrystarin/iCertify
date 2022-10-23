import Member from '../models/Member.js'
import bcrypt from 'bcrypt';
import { ethers } from 'ethers'
import { createToken, filterBody, generateNonce } from '../tools.js';
import { InvalidRequestBodyError, NotFoundError, UnauthorizedError } from '../errors.js';

const memberDetails = 'isPremium name about occupation contact location';

const loginMember = async (req, res, next) => {
    try {
        const { type, credentials } = filterBody(
            ['type', 'credentials'],
            req.body
        );

        if(!(   type
             && credentials
             && typeof type === 'string'
             && credentials instanceof Array
             && new Set(['email', 'metamask']).has(type)
             && credentials.length == 2
        )) throw new InvalidRequestBodyError();

        if(!(credentials[0] && credentials[1])) throw new UnauthorizedError('Invalid fields');

        // Login type: email
        if(type == 'email') {
            const [email, password] = credentials;

            // Find if there is an existing member with the given email
            const member = await Member.findOne({ credentials: { email } }).exec();

            // Member is not registered yet, throw error
            if(!member) throw new NotFoundError('Member');

            // Match password
            const isMatch = bcrypt.compare(password, member.credentials.password);
            if(!isMatch) throw new UnauthorizedError('Incorrect credentials');
            
            // Create jwt token
            const token = createToken(member._id);

            res.status(200).json({ email, token });
        }

        // Login type: metamask
        if(type == 'metamask') {
            const [walletAddress, signature] = credentials;

            // Find if there is an existing member with the given wallet address
            //      If there is, get that member
            //      Otherwise, register new member
            const member = await Member.findOne({ walletAddress }).exec() ||
                           await Member.create({ walletAddress });

            // Get the signer address of the signature with the message
            const signerAddress = await ethers.utils.verifyMessage('Nonce: ' + member.credentials.nonce, signature, 'asdf')
            if(signerAddress !== walletAddress) throw new UnauthorizedError('Invalid signer');

            // Update the nonce
            member.credentials.nonce = generateNonce();
            await member.save()

            // Create jwt token
            const token = createToken({ _id: member._id, walletAddress });

            res.status(200).json({ walletAddress, token });
        }
    } catch (error) {
        next(error);
    }    
}

const getNonce = async (req, res, next) => {
    const { walletAddress } = req.params;

    try {
        const member = await Member.findOne({ walletAddress }).exec();
        if(!member) throw new NotFoundError('Member');

        res.status(200).json({ nonce: member.credentials.nonce });
    } catch(error) {
        next(error)
    }
}

const getAllMembers = async (req, res, next) => {
    try {
        const members = await Member
            .find()
            .select('-_id walletAddress ' + memberDetails)
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
            .select('-_id ' + memberDetails)
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
        const member = await Member
            .findOne({ walletAddress })
            .exec();
        if(!member) throw new NotFoundError('Member');

        const body = filterBody(
            memberDetails.split(' '),
            req.body
        );

        Object.assign(member, body);
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
            .populate('joinedEvents.event', '-_id eventId canClaimDocument status')
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
            .populate('requests')
            .exec();
        if(!member) throw new NotFoundError('Member');

        res.status(200).json(member.requests);
    } catch (error) {
        next(error);
    }
}

export {
    loginMember,
    getNonce,
    getAllMembers,
    getMember,
    updateMember,
    getJoinedEvents,
    getDocuments,
    getRequests
}