const { UnprocessableRequest, NotFound, Unauthorized } = require('../miscellaneous/errors');
const Accountant = require('../models/Accountant');
const Event = require('../models/Event');
const Member = require('../models/Member');
const Transaction = require('../models/Transaction');

const saveTransaction = async (req, res, next) => {
    const { senderAddress, receiverAddress, eventId, txInfo: {hash, fee} } = req.body;

    try {
        if(!(  senderAddress    && typeof senderAddress === 'string'
            && receiverAddress  && typeof receiverAddress === 'string'
            && eventId          && typeof eventId === 'string'
            && hash             && typeof hash === 'string'
            && fee              && typeof fee === 'number'
        )) throw new UnprocessableRequest();

        // Check if accountant is a member
        const accountantMember = await Member.findOne({ walletAddress: senderAddress }).exec();
        if(!accountantMember) throw new NotFound('Accountant must be a member');

        const sender = await Accountant.findOne({ member: accountantMember._id }).exec();
        if(!sender) throw new Unauthorized('Accountant is not registered');

        const receiver = await Member.findOne({ walletAddress: receiverAddress }).exec();
        if(!receiver) throw new NotFound('Address is not a member');

        const event = await Event.findOne({ eventId }).exec();
        if(!event) throw new NotFound('Event is not created yet');
        
        const transaction = await Transaction.create({
            hash,
            fee,
            event: event._id,
            sender: sender._id,
            receiver: receiver._id,
        });

        res.status(201).json({
            message: 'Transaction saved',
            id: transaction._id,
            hash
        });
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
        if(!transaction) throw new NotFound('Transaction is not saved yet');

        res.status(200).json(transaction);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    saveTransaction,
    getAllTransactions,
    getTransaction
}