import Member from '../models/Member.js'
import bcrypt from 'bcrypt';
import { ethers } from 'ethers'
import { createToken, filterBody, generateNonce } from '../tools.js';
import { InvalidRequestBodyError, NotFoundError, UnauthorizedError } from '../errors.js';

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
        )) throw new InvalidRequestBodyError();

        if(!(credentials[0] && credentials[1])) throw new UnauthorizedError('Invalid fields');

        if(type == 'email') {
            const [email, password] = credentials;

            const member = await Member.findOne({ credentials: { email } }).exec();
            if(!member) throw new NotFoundError('Member');

            const isMatch = bcrypt.compare(password, member.credentials.password);
            if(!isMatch) throw new UnauthorizedError('Incorrect credentials');
            
            const token = createToken({_id: member._id, walletAddress: member.walletAddress});

            res.status(200).json({ email, token });
        }
        /**
         * type: metamask
         * credentials: [walletAddress, signature]
         */
        if(type == 'metamask') {
            const [walletAddress, signature] = credentials;
            const member = await Member.findOne({ walletAddress }).exec() ||
                           await Member.create({ walletAddress });

            const signerAddress = ethers.utils.verifyMessage('Nonce: ' + member.credentials.nonce, signature);
            if(signerAddress !== walletAddress) throw new UnauthorizedError('Invalid signer');

            member.credentials.nonce = generateNonce();
            await member.save()

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
        res.status(200).json({ nonce: member?.credentials.nonce ?? generateNonce() });
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