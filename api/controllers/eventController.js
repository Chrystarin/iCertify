const { nanoid } = require('nanoid');
const { UnprocessableRequest, NotFound, Forbidden } = require('../miscellaneous/errors');
const Event = require('../models/Event');
const Member = require('../models/Member');

const filterRequestBody = ({
    type,
    title,
    description,
    link,
    location,
    date: {start, end},
    canClaimCertificate,
    status,
    isAcceptingVolunteer,
    tags
}) => {
    // Validate required fields
    if(!(  type         && typeof type === 'string'
        && title        && typeof title === 'string'
        && description  && typeof description === 'string'
        && link         && typeof link === 'string'
        && start        && typeof start === 'number'
        && end          && typeof end === 'number'
    )) return new UnprocessableRequest();

    var obj = {
        type,
        title,
        description,
        link,
        date: {start, end}
    }

    // Validate optional fields
    if(location !== undefined) {
        if(!(location && typeof location === 'string'))
            return new UnprocessableRequest()
        else obj['location'] = location;
    }

    if(canClaimCertificate !== undefined) {
        if(!(typeof canClaimCertificate === 'boolean'))
            return new UnprocessableRequest();
        else obj['canClainCertificate'] = canClaimCertificate;
    }

    if(status !== undefined) {
        if(!(status && typeof status === 'string'))
            return new UnprocessableRequest()
        else obj['status'] = status;
    }

    if(isAcceptingVolunteer !== undefined) {
        if(!(typeof isAcceptingVolunteer === 'boolean'))
            return new UnprocessableRequest()
        else obj['isAcceptingVolunteer'] = isAcceptingVolunteer;
    }

    if(tags !== undefined) {
        if(!(tags instanceof Array))
            return new UnprocessableRequest()
        else obj['tags'] = tags;
    }

    return obj;
}

const createEvent = async (req, res, next) => {
    try {
        const body = filterRequestBody(req.body);
        if(body instanceof Error) throw body;

        const event = await Event.create({
            eventId: nanoid(8),
            ...body
        });

        res.status(201).json({
            message: 'Event created',
            eventId: event.eventId
        });
    } catch (error) {
        next(error);
    }
}

const joinEvent = async (req, res, next) => {
    const { eventId } = req.params;
    const { walletAddress, role } = req.body;

    try {
        if(!(  walletAddress    && typeof walletAddress === 'string'
            && role             && typeof role === 'string'
        )) throw new UnprocessableRequest();

        // Find event
        const event = await Event.findOne({ eventId }).exec();
        if(!event) throw new NotFound('Event');

        // Find member
        const member = await Member.findOne({ walletAddress }).exec();
        if(!member) throw new NotFound('Member');

        // Check if member already joined
        if(event.participants.filter(([pid]) => pid === member._id).length > 0)
            throw new Forbidden('Member already joined');

        event.participants.push({ member: member._id, role });
        member.joinedEvents.push({ event: event._id, role });

        await event.save();
        await member.save();

        res.status(200).json({ message: 'Successfully joined to event' });
    } catch (error) {
        next(error);
    }
}

const getAllEvents = async (req, res, next) => {
    try {
        const events = await Event
            .find()
            .select('-_id -__v -participants -requests')
            .exec();

        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
}

const getEvent = async (req, res, next) => {
    const { eventId } = req.params;

    try {
        const event = await Event
            .findOne({ eventId })
            .select('-_id -__v -participants -requests')
            .exec();
        if(!event) throw new NotFound('Event');

        res.status(200).json(event);
    } catch (error) {
        next(error);
    }
}

const getParticipants = async (req, res, next) => {
    const { eventId } = req.params;

    try {
        const event = await Event
            .findOne({ eventId })
            .select('-participants._id')
            .populate('participants.member', '-_id walletAddress name')
            .exec();
        if(!event) throw new NotFound('Event');

        res.status(200).json(event.participants);
    } catch (error) {
        next(error);
    }
}

const updateEvent = async (req, res, next) => {
    const { eventId } = req.params;

    try {
        const body = filterRequestBody(req.body);
        if(body instanceof Error) throw body;

        const event = await Event.findOne({ eventId }).exec();
        if(!event) throw new NotFound('Event');

        Object.assign(event, body);
        await event.save();

        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createEvent,
    joinEvent,
    getAllEvents,
    getEvent,
    getParticipants,
    updateEvent
}