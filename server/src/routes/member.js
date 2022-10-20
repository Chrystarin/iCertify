import express from 'express';
import {
    loginMember,
    getNonce,
    getAllMembers,
    getMember,
    updateMember,
    setPremium,
    getJoinedEvents,
    getDocuments,
    getRequests
} from '../controllers/memberController.js';

const router = express.Router();

router.get('/', getAllMembers);
router.get('/:walletAddress', getMember);
router.get('/:walletAddress/nonce', getNonce);
router.get('/:walletAddress/events', getJoinedEvents);
router.get('/:walletAddress/documents', getDocuments);
router.get('/:walletAddress/requests', getRequests);

router.post('/login', loginMember);

router.patch('/:walletAddress', updateMember);
router.patch('/:walletAddress/premium', setPremium)

export default router;