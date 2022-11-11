import jwt from 'jsonwebtoken';
import Member from '../models/Member.js';
import Accountant from '../models/Accountant.js';
import { ROLES } from '../tools.js';
import { NotFoundError, UnauthorizedError } from '../errors.js';

const ADMIN_WALLET_ADDRESS = '0x0';

export default async (req, res, next) => {
    // console.log('You passed authUser route');
    
    const token = req.header('X-Auth-Token');
    if(!token) {
        req.user = ROLES.VIEWER;
        return next();
    }

    try {
        // Verify token
        const { _id, walletAddress } = jwt.verify(token, process.env.JWT_SECRET);

        // Admin
        if(walletAddress === ADMIN_WALLET_ADDRESS) {
            req.user = ROLES.ADMIN;
            return next();
        }

        // Find member
        const member = await Member.findById(_id).exec();

        // Not existing
        if(!member) throw new NotFoundError('Member');

        // Accountant
        if(await Accountant.findOne({member: _id }).exec()) {
            req.user = ROLES.ACCOUNTANT;
            return next();
        }

        // Organizer
        if(member.joinedEvents.filter(([e, r]) => r === ROLES.ORGANIZER).length > 0) {
            req.user = ROLES.ORGANIZER;
            return next();
        }

        // Member
        req.user = ROLES.MEMBER;
        next();
    } catch (error) {
        if(error.name === 'TokenExpiredError')
            return next(new UnauthorizedError('Token expired'));
        next(error);
    }
}