const { getRequests, processRequest, createRequest } = require('../controllers/requestController');
const { onlyUser, onlyInstitution } = require('../middlewares/authorize');

const router = require('express').Router();

/**
 * Get requests
 * 
 * type [join | document]
 * walletAddress - optional [many | one]
 * requestId - optional
 */
router.get('/', getRequests);

/**
 * Create request
 * 
 * type [join | document]
 * walletAddress
 */
router.post('/', onlyUser, createRequest);

/**
 * Process request
 * 
 * requestId
 * status [approved | rejected]
 */
router.patch('/', onlyInstitution, processRequest);

module.exports = router;