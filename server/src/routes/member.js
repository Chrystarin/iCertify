import express from 'express';

import { udpateProfile, loginMember } from '../controllers/memberController.js';

const router = express.Router();

router.post('/login', loginMember);

router.patch('/:walletAddress/update/profile', udpateProfile);
router.patch('/:walletAddress/update/membership', udpateProfile);
router.patch('/:walletAddress/update/credentials', udpateProfile);

export default router;