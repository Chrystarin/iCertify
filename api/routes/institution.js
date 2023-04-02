const router = require('express').Router();

const asyncHandler = require('../middlewares/asyncHandler');
const authenticate = require('../middlewares/authenticate');
const { onlyInstitution } = require('../middlewares/authorize');
const {
	getInstitutions,
	getMembers,
	updateInstitution,
	addOfferedDoc,
	getOfferedDocs
} = asyncHandler(require('../controllers/institutionController'));

/**
 * Get institutions
 *
 * walletAddress
 */
router.get('/', getInstitutions);

router.use(authenticate);

/**
 * Edit institution details
 *
 * name
 */
router.patch('/', onlyInstitution, updateInstitution);

/**
 * Get members of institutions
 *
 * walletAddress - optional [many | one]
 */
router.get('/members', onlyInstitution, getMembers);

/**
 * Add an offered doc
 *
 * title
 * description
 * price
 * requirements
 */
router.post('/offers', onlyInstitution, addOfferedDoc);

/**
 * Get all offered docs
 *
 * walletAddress - optional [user | institution]
 */
router.get('/offers', getOfferedDocs);

module.exports = router;
