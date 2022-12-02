const Accountant = require('../models/Accountant');
const Member = require('../models/Member');
const { UnprocessableRequest, NotFound } = require('../miscellaneous/errors');

const missingAccountant = new NotFound('Accountant not registered');
const accountantNotMember = new NotFound('Accountant must be member');

const registerAccountant = async (req, res, next) => {
    const { walletAddress } = req.body;

    try {
        if(!(  walletAddress
            && typeof walletAddress === 'string'
        )) throw new UnprocessableRequest();
        
        const member = await Member.findOne({ walletAddress }).exec();
        if(!member) throw accountantNotMember;

        await Accountant.create({ member: member._id });
        
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

const getAllAccountants = async (req, res, next) => {
    try {
        const allAccountants = await Accountant
            .find()
            .select('-_id -__v -transactions')
            .populate('member', '-_id walletAddress name')
            .exec();

        res.status(200).json(allAccountants);
    } catch (error) {
        next(error);
    }
}

const getAccountant = async (req, res, next) => {
    const { walletAddress } = req.params;

    try {
        const accountant = await Accountant
            .findOne({ walletAddress })
            .select('-_id -__v -transactions')
            .populate('member', '-_id walletAddress name')
            .exec();
        if(!accountant) throw missingAccountant;

        res.status(200).json(accountant);
    } catch (error) {
        next(error);
    }
}

const getTransactions = async (req, res, next) => {
    const { walletAddress } = req.params
    
    try {
        const accountant = await Accountant
            .findOne({ walletAddress })
            .populate('transactions', 'hash date')
            .exec();
        if(!accountant) throw missingAccountant;

        res.status(200).json(accountant.transactions);
    } catch (error) {
        next(error);
    }
}

const addFunds = async (req, res, next) => {
    const { walletAddress } = req.params;
    const { amount } = req.body;

    try {
        if(!(  amount
            && typeof amount === 'number'
        )) throw new UnprocessableRequest();

        const member = await Member.findOne({ walletAddress }).exec();
        if(!member) throw accountantNotMember;

        const accountant = await Accountant.findOne({ member: member._id }).exec();
        if(!accountant) throw missingAccountant;

        accountant.fund += amount;
        await accountant.save();

        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}

const dismissAccountant = async (req, res, next) => {
    const { walletAddress } = req.params;

    try {
        const accountant = await Accountant.findOne({ walletAddress }).exec();
        if(!accountant) throw missingAccountant;

        accountant.isActive = false;
        await accountant.save();

        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    registerAccountant,
    getAllAccountants,
    getAccountant,
    getTransactions,
    addFunds,
    dismissAccountant
}