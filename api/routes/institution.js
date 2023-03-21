const {
	getInstitutions,
	getMembers,
	updateInstitution,
	registerInstitution,
	loginInstitution
} = require('../controllers/institutionController');
const authenticate = require('../middlewares/authenticate');
const { onlyInstitution, onlyUser } = require('../middlewares/authorize');

const router = require('express').Router();

/**
 * Register institution
 *
 * walletAddress
 * name
 */
router.post('/register', registerInstitution);

/**
 * Login institution
 *
 * signature
 * walletAddress
 */
router.post('/login', loginInstitution);

router.use(authenticate);

/**
 * Get institutions
 *
 * walletAddress - optional [many | one]
 */
router.get('/', getInstitutions);

/**
 * Get members of institutions
 *
 * walletAddress - optional [many | one]
 */
router.get('/members', onlyInstitution, getMembers);

/**
 * Edit institution details
 *
 * name
 */
router.patch('/', onlyInstitution, updateInstitution);

module.exports = router;
