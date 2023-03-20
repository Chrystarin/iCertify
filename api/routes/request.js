const router = require('express').Router();

/**
 * Get requests
 * 
 * type [institution | document]
 * walletAddress - optional [many | one]
 */
router.get('/');

/**
 * Process request
 * 
 * requestId
 * status [approved | rejected]
 */
router.patch('/');

module.exports = router;