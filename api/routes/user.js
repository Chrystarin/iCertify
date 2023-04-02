const router = require('express').Router();

const asyncHandler = require('../middlewares/asyncHandler');
const authenticate = require('../middlewares/authenticate');
const { onlyUser } = require('../middlewares/authorize');

const { getUser, updateUser } = asyncHandler(
	require('../controllers/userController')
);

/**
 * Get user
 *
 * walletAddress
 */
router.get('/', getUser);

router.use(authenticate);

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
