const router = require('express').Router();

const asyncHandler = require('../middlewares/asyncHandler');
const authenticate = require('../middlewares/authenticate');

const { register, login, refresh } = asyncHandler(
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

router.use(authenticate);

/**
 * Generate a new access-token
 */
router.post('/refresh', refresh);

module.exports = router;
