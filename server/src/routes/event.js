import express from 'express';
import {
    createEvent,
    joinEvent,
    getAllEvents,
    getEvent,
    getParticipants,
    updateEvent
} from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getAllEvents);
router.get('/:eventId', getEvent);
router.get('/:eventId/participants', getParticipants);

router.post('/create', createEvent);
router.post('/:eventId/join', joinEvent);

router.patch('/:eventId', updateEvent);

export default router;