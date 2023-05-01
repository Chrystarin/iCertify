const fileUpload = require('express-fileupload');
const { Router } = require('express');

const { onlyUser } = require('../middlewares/authorize');
const router = Router();
const asyncHandler = require('../middlewares/asyncHandler');

const { getRequests, processRequest, createRequest } = asyncHandler(
	require('../controllers/requestController')
);

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
router.post('/', fileUpload(), onlyUser, createRequest);

/**
 * Process request
 *
 * requestId
 * status [approved | rejected]
 */
router.patch('/', fileUpload(), processRequest);

module.exports = router;
