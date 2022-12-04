const express = require('express');
const { createRequest, getAllReqeusts, getRequest, updateStatus } = require('../controllers/requestController');

const router = express.Router();

// Members
router.get('/', getAllReqeusts);
router.get('/:requestId', getRequest);

router.post('/create', createRequest);

router.patch('/:requestId/status', updateStatus);

module.exports = router;