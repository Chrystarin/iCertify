import express from 'express';
import {
    loginMember,
    getNonce,
    getAllMembers,
    getMember,
    updateMember,
    getJoinedEvents,
    getDocuments,
    getRequests
} from '../controllers/memberController.js';
import authUser from '../middlewares/authUser.js';

const router = express.Router();

router.post('/login', loginMember);

router.get('/:walletAddress/nonce', getNonce);

// Authentication
router.use(authUser);

router.get('/', getAllMembers);
router.get('/:walletAddress', getMember);
router.get('/:walletAddress/events', getJoinedEvents);
router.get('/:walletAddress/documents', getDocuments);
router.get('/:walletAddress/requests', getRequests);

router.patch('/:walletAddress', updateMember);

export default router;