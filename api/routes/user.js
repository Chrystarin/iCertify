const {
	registerUser,
	getUser,
	updateUser,
	loginUser
} = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');
const { onlyUser } = require('../middlewares/authorize');

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

router.use(authenticate);

/**
 * Get user
 *
 * walletAddress - optional [other | self]
 */
router.get('/', onlyUser, getUser);

/**
 * Update user
 *
 * firstName
 * lastName
 * extension
 * about
 */
router.patch('/', onlyUser, updateUser);

module.exports = router;