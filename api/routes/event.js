const express = require('express');
const {
    createEvent,
    joinEvent,
    getAllEvents,
    getEvent,
    getParticipants,
    updateEvent
} = require('../controllers/eventController');

const router = express.Router();

router.get('/', getAllEvents);
router.get('/:eventId', getEvent);
router.get('/:eventId/participants', getParticipants);

router.post('/create', createEvent);
router.post('/:eventId/join', joinEvent);

router.patch('/:eventId', updateEvent);

module.exports = router;