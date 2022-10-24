import { nanoid } from 'nanoid';
import Request from '../models/Request.js';
import Event from '../models/Event.js';
import Member from '../models/Member.js';
import { InvalidRequestBodyError, NotFoundError } from '../errors.js';
import { filterBody } from '../tools.js';

const createRequest = async (req, res, next) => {
    const { walletAddress, eventId } = req.body;

    try {
        if(!(  walletAddress
            && eventId
            && typeof walletAddress === 'string'
            && typeof eventId === 'string'
        )) throw new InvalidRequestBodyError();

        const requestor = await Member.findOne({ walletAddress }).exec();
        if(!requestor) throw new NotFoundError('Requestor');

        const event = await Event.findOne({ eventId }).exec();
        if(!event) throw new NotFoundError('Event');

        const request = await Request.create({
            requestId: nanoid(8),
            ...filterBody(
                ['_id', '__v', 'requestId', 'requestor', 'event'],
                req.body
            )
        });

        requestor.requests.push(request._id);
        event.requests.push(request._id);

        await requestor.save();
        await event.save();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

const getAllReqeusts = async (req, res, next) => {
    try {
        const allRequests = await Request
            .find()
            .select('-_id -__v')
            .populate('requestor', 'walletAddress')
            .populate('event', 'eventId title')
            .exec();

        res.status(200).json(allRequests);
    } catch (error) {
        next(error);
    }
}

const getRequest = async (req, res) => {
    const { requestId } = req.params;

    try {
        const allRequests = await Request
            .findOne({ requestId })
            .select('-_id -__v')
            .populate('requestor', 'walletAddress')
            .populate('event', 'eventId title')
            .exec();

        res.status(200).json(allRequests);
    } catch (error) {
        next(error);
    }
}

export {
    createRequest,
    getAllReqeusts,
    getRequest
}