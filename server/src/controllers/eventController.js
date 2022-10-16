import { nanoid } from 'nanoid';
import Event from '../models/Event.js';

// Gets all available events
const all = async (req, res) => {
    try {
        const events = await Event.find({}).select('eventId type title description').exec(); 
        res.status(200).json(events);
    }
    catch (error) {
        const { name, message } = error;
        res.status(400).json({
            error: { name, message },
            message: 'Cannot get events'
        });
    }
}

const details = async (req, res) => {
    const { eventId } = req.params;
    try {
        const event = await Event.findOne({ eventId }).select('-_id -__v -participants').exec();
        res.status(200).json(event);
    }
    catch (error) {
        const { name, message, stack, cause } = error;
        res.status(400).json({
            error: { name, message},
            message: 'Cannot fetch event details'
        });
    }
}

const create = async (req, res) => {
    /* Structure: { <all available> } */
    try {
        const event = await Event.create({
            eventId: nanoid(8),
            ...req.body
        });
        res.status(200).json({ event });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const join = async (req, res) => {
    /* Structure: { memberId: <Member id> } */

}

const update = async (req, res) => {
    /* Structure:
     * {
     *      find: eventId
     *      update: { <properties to update> }
     * }
     */

    const { find, update } = req.body;
    try {
        

        await Event.findOneAndUpdate(find, update);
        res.status(204).json({ message: 'Event updated successfully.' });
    }
    catch (error) {
        const { name, message } = error;
        res.status(400).json({
            error: { name, message },
            message: 'Event update failed.'
        });
    }
}

export {
    all,
    details,
    create,
    update,
    join
}