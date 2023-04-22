const fileUpload = require('express-fileupload');
const { Router } = require('express');

const { onlyUser } = require('../middlewares/authorize');
const router = Router();
const asyncHandler = require('../middlewares/asyncHandler');
const authenticate = require('../middlewares/authenticate');

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
router.patch('/', fileUpload(), onlyUser, updateUser);

module.exports = router;
