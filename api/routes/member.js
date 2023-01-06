const express = require('express');
const {
    loginMember,
    getNonce,
    getAllMembers,
    getMember,
    updateMember,
    getJoinedEvents,
    registerUser,
    userExisting,
    getCertificates
} = require('../controllers/memberController');
const authUser = require('../middlewares/authUser');

const router = express.Router();

router.post('/login', loginMember);
router.post('/register', registerUser);

router.get('/:walletAddress/nonce', getNonce);
router.get('/:walletAddress/exists', userExisting);

router.get('/', getAllMembers);
router.get('/:walletAddress', getMember);
router.get('/:walletAddress/events', getJoinedEvents);
router.get('/:walletAddress/certificates', getCertificates);

router.patch('/:walletAddress', updateMember);

module.exports = router;