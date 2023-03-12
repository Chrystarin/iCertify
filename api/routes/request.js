const router = require('express').Router();

/**
 * Get requests
 * 
 * type [join | document]
 * walletAddress
 */
router.get('/');

/**
 * Process request
 * 
 * type [join | document]
 * requestId
 * status [approved | rejected]
 */
router.patch('/');

module.exports = router;