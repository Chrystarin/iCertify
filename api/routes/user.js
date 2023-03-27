const router = require('express').Router();

const asyncHandler = require('../middlewares/asyncHandler');
const { onlyUser } = require('../middlewares/authorize');

const { getUser, updateUser } = asyncHandler(
	require('../controllers/userController')
);

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
