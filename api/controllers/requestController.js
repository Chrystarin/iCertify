const { nanoid } = require('nanoid');
const Request = require('../models/Request');
const Event = require('../models/Event');
const Member = require('../models/Member');
const { UnprocessableRequest, NotFound } = require('../miscellaneous/errors');

const createRequest = async (req, res, next) => {
    const { requestorAddress, eventId, requestType, status } = req.body;

    try {
        if(!(  requestorAddress && typeof requestorAddress === 'string'
            && eventId          && typeof eventId === 'string'
            && requestType      && typeof requestType === 'string'      && new Set(['event', 'document', 'volunteer']).has(requestType)
            && status           && typeof status === 'string'
        )) throw new UnprocessableRequest();

        const requestor = await Member.findOne({ walletAddress: requestorAddress }).exec();
        if(!requestor) throw new NotFound('Requestor is not a member');

        const event = await Event.findOne({ eventId }).exec();
        if(!event) throw new NotFound('Event is not created yet');

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

        res.status(201).json({
            message: 'Request submitted',
            requestId: request.requestId
        });
    } catch (error) {
        next(error);
    }
}

const getAllReqeusts = async (req, res, next) => {
    try {
        res.status(200).json(
            await Request
                .find()
                .select('-_id -__v')
                .populate('requestor', '-_id walletAddress name')
                .populate('event', '-_id eventId title')
                .exec()
        );
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
        if(!request) throw new NotFound('Request is not created yet');

        res.status(200).json(request);
    } catch (error) {
        next(error);
    }
}

const updateStatus = async (req, res, next) => {
    const { requestId } = req.params;
    const { status } = req.body;

    try {
        if(!(status && typeof status === 'string'))
            throw new UnprocessableEntity();

        const request = await Request.findOne({ requestId }).exec();
        if(!request) throw new NotFound('Request is not created yet');

        request.status = status;
        await request.save();

        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createRequest,
    getAllReqeusts,
    getRequest,
    updateStatus
}