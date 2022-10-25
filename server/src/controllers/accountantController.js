import Accountant from '../models/Accountant.js';
import Member from '../models/Member.js';
import { InvalidRequestBodyError, NotFoundError } from '../errors.js';
import { filterBody } from '../tools.js';

const registerAccountant = async (req, res, next) => {
    const { walletAddress } = req.body;

    try {
        if(!(  walletAddress
            && typeof walletAddress === 'string'
        )) throw new InvalidRequestBodyError();
        
        const member = await Member.findOne({ walletAddress }).exec();
        if(!member) throw new NotFoundError('Member');

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
            .populate('member', 'walletAddress name')
            .exec();

        res.send(200).json(allAccountants);
    } catch (error) {
        next(error);
    }
}

const getAccountant = async (req, res, next) => {
    const { walletAddress } = req.params;

    try {
        if(!(  walletAddress
            && typeof walletAddress === 'string'
        )) throw new InvalidRequestBodyError();

        const accountant = await Accountant
            .findOne({ walletAddress })
            .select('-_id -__v -transactions')
            .populate('member', 'walletAddress name')
            .exec();
        if(!accountant) throw new NotFoundError('Accountant');

        res.status(200).json(accountant);
    } catch (error) {
        next(error);
    }
}

const getTransactions = async (req, res, next) => {
    
}

const addFunds = async (req, res, next) => {

}

const dismissAccountant = async (req, res, next) => {

}

export {
    registerAccountant,
    getAllAccountants,
    getAccountant,
    getTransactions,
    addFunds,
    dismissAccountant
}