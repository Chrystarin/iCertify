const fileUpload = require('express-fileupload');
const { Router } = require('express');

const { onlyInstitution } = require('../middlewares/authorize');
const router = Router();
const asyncHandler = require('../middlewares/asyncHandler');
const authenticate = require('../middlewares/authenticate');

const {
	addOfferedDoc,
	addPayment,
    blockMember,
	deletePayment,
	editOfferedDoc,
	editPayment,
	getInstitutions,
	getMembers,
	getOfferedDocs,
	updateInstitution
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
router.patch('/', fileUpload({ limits: { fileSize: 5 * 1024 * 1024 }, abortOnLimit: true }), updateInstitution);

/**
 * Get members of institutions
 *
 * walletAddress - optional [many | one]
 */
router.get('/members', getMembers);

/**
 * Block a member of an institution
 * 
 * walletAddress
 */
router.patch('/members', blockMember);

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
 * Edit an offered doc
 *
 * docId
 * title
 * description
 * price
 * requirements
 * status
 */
router.patch('/offers', editOfferedDoc);

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
