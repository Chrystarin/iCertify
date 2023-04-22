const { Router } = require('express');

const router = Router();
const asyncHandler = require('../middlewares/asyncHandler');
const authenticate = require('../middlewares/authenticate');

const { register, login, refresh, logout } = asyncHandler(
	require('../controllers/authController')
);

/**
 * Register users and institutions
 *
 * walletAddress
 * email
 * userType
 * details
 *
 *     [USER]
 *     firstName
 *     middleName
 *     lastName
 *     birthDate
 *
 *     [INSTITUTION]
 *     name
 *     type
 *     txHash
 */
router.post('/register', register);

/**
 * Uer login
 *
 * signature
 * walletAddress
 * userType
 */
router.post('/login', login);

/**
 * Generate a new access-token
 */
router.post('/refresh', refresh);

router.use(authenticate);

/**
 * Logs out user
 */
router.post('/logout', logout);

module.exports = router;
