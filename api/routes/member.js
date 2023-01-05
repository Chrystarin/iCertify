const express = require('express');
const {
    loginMember,
    getNonce,
    getAllMembers,
    getMember,
    updateMember,
    getJoinedEvents,
    getDocuments,
    getRequests,
    registerUser,
    userExisting
} = require('../controllers/memberController');
const authUser = require('../middlewares/authUser');

const router = express.Router();

// public
router.post('/login', loginMember);
router.post('/register', registerUser);

router.get('/:walletAddress/nonce', getNonce);
router.get('/:walletAddress/exists', userExisting);

// Authentication
router.use(authUser);

router.get('/', getAllMembers);
router.get('/:walletAddress', getMember);
router.get('/:walletAddress/events', getJoinedEvents);
router.get('/:walletAddress/certificates', getDocuments);
router.get('/:walletAddress/requests', getRequests);

// Members
router.patch('/:walletAddress', updateMember);

module.exports = router;