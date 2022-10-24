import { nanoid } from 'nanoid';
import Event from '../models/Event.js';
import Member from '../models/Member.js';
import { InvalidRequestBodyError, NotFoundError } from '../errors.js';
import { filterBody } from '../tools.js';

const constantDetails = ['_id', '__v', 'participants', 'requests'];

const createEvent = async (req, res, next) => {
    try {
        const body = filterBody(['eventId', ...constantDetails], req.body);

        const event = await Event.create({
            eventId: nanoid(8),
            ...body
        });

        res.status(201).json({ message: 'Event created', eventId: event.eventId });
    } catch (error) {
        next(error);
    }
}

const joinEvent = async (req, res, next) => {
    const { eventId } = req.params;

    try {
        const { walletAddress, role } = req.body;
        if(!(walletAddress && role)) throw new InvalidRequestBodyError();

        const event = await Event.findOne({ eventId }).exec();
        if(!event) throw new NotFoundError('Event');

        const member = await Member.findOne({ walletAddress }).exec();
        if(!member) throw new NotFoundError('Member');

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
            .select('-' + constantDetails.join(' -'))
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
            .select('-' + 
                constantDetails
                    .filter(element => element !== 'eventId')
                    .join(' -'))
            .exec();
        if(!event) throw new NotFoundError('Event');

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
        if(!event) throw new NotFoundError('Event');

        res.status(200).json(event.participants);
    } catch (error) {
        next(error);
    }
}

const updateEvent = async (req, res, next) => {
    const { eventId } = req.params;

    try {
        const event = await Event.findOne({ eventId }).exec();
        if(!event) throw new NotFoundError('Event');

        const body = filterBody(['eventId', ...constantDetails], req.body);

        Object.assign(event, body);
        await event.save();

        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}

export {
    createEvent,
    joinEvent,
    getAllEvents,
    getEvent,
    getParticipants,
    updateEvent
}