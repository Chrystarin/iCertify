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

// Members
router.get('/', getAllEvents);
router.get('/:eventId', getEvent);
router.get('/:eventId/participants', getParticipants);

// Admin
router.post('/create', createEvent);

// Organizer
router.post('/:eventId/join', joinEvent);

router.patch('/:eventId', updateEvent);

module.exports = router;