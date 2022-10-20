import express, { Router } from 'express';
import { createRequest, getAllReqeusts, getRequest } from '../controllers/requestController.js';

const router = express.Router();

router.get('/', getAllReqeusts);
router.get('/:reqeustId', getRequest);

router.post('/create', createRequest);

export default router;