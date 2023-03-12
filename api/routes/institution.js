const router = require('express').Router();

/**
 * Get institutions
 *
 * [user]
 * institutionId - optional [many | one]
 */
router.get('/');

/**
 * Get members of institutions
 * 
 * walletAddress - optional [many | one]
 */
router.get('/members');

/**
 * Edit institution details
 */
router.patch('/');

/**
 * Register institution
 * 
 * walletAddress
 * name
 */
router.post('/');

/**
 * Join institution
 * 
 * walletAddress
 */
router.post('/join');

module.exports = router;
