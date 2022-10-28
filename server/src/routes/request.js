import express, { Router } from 'express';
import { createRequest, getAllReqeusts, getRequest, updateStatus } from '../controllers/requestController.js';

const router = express.Router();

router.get('/', getAllReqeusts);
router.get('/:requestId', getRequest);

router.post('/create', createRequest);

router.patch('/:requestId/status', updateStatus);

export default router;