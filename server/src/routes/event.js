import express from 'express';
import {
    all,
    create,
    update,
    details,
    participants,
    join
} from '../controllers/eventController.js';

const router = express.Router();

router.get('/all', all);
router.get('/:eventId', details);
router.get('/:eventId/participants', participants);

router.post('/create', create);
router.post('/:eventId/join', join);

router.patch('/update', update);

export default router;