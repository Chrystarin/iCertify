const fileUpload = require('express-fileupload');
const { Router } = require('express');

const { onlyInstitution } = require('../middlewares/authorize');
const router = Router();
const asyncHandler = require('../middlewares/asyncHandler');
const authenticate = require('../middlewares/authenticate');

const {
	addOfferedDoc,
	getInstitutions,
	getMembers,
	getOfferedDocs,
	updateInstitution,
	addPayment,
	deletePayment,
	editPayment
} = asyncHandler(require('../controllers/institutionController'));

/**
 * Get institutions
 *
 * walletAddress
 */
router.get('/', getInstitutions);

router.use(authenticate);

/**
 * Get all offered docs
 *
 * walletAddress - optional [user | institution]
 */
router.get('/offers', getOfferedDocs);

router.use(onlyInstitution);

/**
 * Edit institution details
 *
 * name
 */
router.patch('/', fileUpload(), updateInstitution);

/**
 * Get members of institutions
 *
 * walletAddress - optional [many | one]
 */
router.get('/members', getMembers);

/**
 * Add an offered doc
 *
 * title
 * description
 * price
 * requirements
 */
router.post('/offers', addOfferedDoc);

/**
 * Add payment details
 * 
 * type
 * 
 * [bank]
 * bank name
 * account name
 * account number
 * 
 * [ewallet]
 * ewallet name
 * account name
 * account number
 * 
 * [otc]
 * otc name
 * location
 * instructions
 */
router.post('/payment', addPayment);

/**
 * Edit payment details
 * 
 * paymentId
 * 
 * [bank]
 * bank name
 * account name
 * account number
 * 
 * [ewallet]
 * ewallet name
 * account name
 * account number
 * 
 * [otc]
 * otc name
 * location
 * instructions
 */
router.patch('/payment', editPayment);

/**
 * Remove an existing payment detail
 * 
 * paymentId
 */
router.delete('/payment', deletePayment);

module.exports = router;
