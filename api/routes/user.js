const {
	registerUser,
	getUser,
	updateUser,
    loginUser
} = require('../controllers/userController');

const router = require('express').Router();

/**
 * Register user
 *
 * walletAddress
 * firstName
 * lastName
 * extension
 * about
 */
router.post('/register', registerUser);

/**
 * Login user
 * 
 * signature
 * walletAddress
 */
router.post('/login', loginUser);

/**
 * [REGISTERED - User]
 * 
 * Get user
 *
 * walletAddress - optional [other | self]
 */
router.get('/', getUser);

/**
 * [REGISTERED - Self]
 * 
 * Update user
 * 
 * firstName
 * lastName
 * extension
 * about
 */
router.patch('/', updateUser);

module.exports = router;
