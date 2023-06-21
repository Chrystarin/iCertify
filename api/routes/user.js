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

/**
 * Update user
 *
 * firstName
 * middleName - optional
 * lastName
 * email
 * birthDate
 * address - optional
 * contactNo - optional
 * about - optional
 * photo - optional
 */
router.patch('/', authenticate, fileUpload({ limits: { fileSize: 5 * 1024 * 1024 }, abortOnLimit: true }), onlyUser, updateUser);

module.exports = router;
