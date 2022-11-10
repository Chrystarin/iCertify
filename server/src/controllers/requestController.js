import { nanoid } from 'nanoid';
import Request from '../models/Request.js';
import Event from '../models/Event.js';
import Member from '../models/Member.js';
import { InvalidRequestBodyError, NotFoundError } from '../errors.js';

const createRequest = async (req, res, next) => {
    const { walletAddress, eventId, requestType, status } = req.body;

    try {
        if(!(  walletAddress
            && eventId
            && requestType
            && status
            && typeof walletAddress === 'string'
            && typeof eventId === 'string'
            && typeof requestType === 'string'
            && typeof status === 'string'
        )) throw new InvalidRequestBodyError();

        const requestor = await Member.findOne({ walletAddress }).exec();
        if(!requestor) throw new NotFoundError('Requestor');

        const event = await Event.findOne({ eventId }).exec();
        if(!event) throw new NotFoundError('Event');

        const request = await Request.create({
            requestId: nanoid(8),
            requestType,
            status,
            requestor: requestor._id,
            event: event._id
        });

        requestor.requests.push(request._id);
        await requestor.save();

        event.requests.push(request._id);
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
            .populate('requestor', '-_id walletAddress name')
            .populate('event', '-_id eventId title')
            .exec();

        res.status(200).json(allRequests);
    } catch (error) {
        next(error);
    }
}

const getRequest = async (req, res, next) => {
    const { requestId } = req.params;

    try {
        const request = await Request
            .findOne({ requestId })
            .select('-_id -__v')
            .populate('requestor', '-_id walletAddress name')
            .populate('event', '-_id eventId title')
            .exec();

        res.status(200).json(request);
    } catch (error) {
        next(error);
    }
}

const updateStatus = async (req, res, next) => {
    const { requestId } = req.params;
    const { status } = req.body;

    try {
        if(!(  status
            && typeof status === 'string'
        )) throw new InvalidRequestBodyError();

        const request = await Request.findOne({ requestId }).exec();
        if(!request) throw new NotFoundError('Request');

        request.status = status;
        await request.save();

        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}

export {
    createRequest,
    getAllReqeusts,
    getRequest,
    updateStatus
}