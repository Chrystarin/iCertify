import { InvalidRequestBodyError, NotFoundError, UnauthorizedError } from '../errors.js';
import Accountant from '../models/Accountant.js';
import Event from '../models/Event.js';
import Member from '../models/Member.js';
import Transaction from '../models/Transaction.js';

const saveTransaction = async (req, res, next) => {
    const { senderAddress, receiverAddress, eventId, txInfo } = req.body;

    try {
        if(!(  senderAddress
            && receiverAddress
            && eventId
            && txInfo
            && typeof senderAddress === 'string'
            && typeof receiverAddress === 'string'
            && typeof eventId === 'string'
            && typeof txInfo === 'object'
            && txInfo.hash
            && txInfo.fee
            && typeof txInfo.hash === 'string'
            && typeof txInfo.fee === 'number'
        )) throw new InvalidRequestBodyError();

        const findMember = await Member.findOne({ walletAddress: senderAddress }).exec();
        if(!findMember) throw new NotFoundError('Member');

        const sender = await Accountant.findOne({ member: findMember._id }).exec();
        if(!sender) throw new UnauthorizedError('Not accountant');

        const receiver = await Member.findOne({ walletAddress: receiverAddress }).exec();
        if(!receiver) throw new NotFoundError('Member');

        const event = await Event.findOne({ eventId }).exec();
        if(!event) throw new NotFoundError('Event');
        
        await Transaction.create({
            hash: txInfo.hash,
            event: event._id,
            sender: sender._id,
            receiver: receiver._id,
            fee: txInfo.fee
        });

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

const getAllTransactions = async (req, res, next) => {
    try {
        const allTransactions = await Transaction
            .find()
            .select('-_id -__v')
            .populate('event', '-_id eventId title')
            .populate({
                path: 'sender',
                populate: {
                    path: 'member',
                    model: 'Member',
                    select: '-_id walletAddress name'
                },
                select: '-_id member'
            })
            .populate('receiver', '-_id walletAddress name')
            .exec()

        res.status(200).json(allTransactions);
    } catch (error) {
        next(error);
    }
}

const getTransaction = async (req, res, next) => {
    const { hash } = req.params;

    try {
        const transaction = await Transaction
            .findOne({ hash })
            .select('-_id -__v')
            .populate('event', '-_id eventId title')
            .populate({
                path: 'sender',
                populate: {
                    path: 'member',
                    model: 'Member',
                    select: '-_id walletAddress name'
                },
                select: '-_id member'
            })
            .populate('receiver', '-_id walletAddress name')
            .exec()
        if(!transaction) throw new NotFoundError('Transaction');

        res.status(200).json(transaction);
    } catch (error) {
        next(error);
    }
}

export {
    saveTransaction,
    getAllTransactions,
    getTransaction
}