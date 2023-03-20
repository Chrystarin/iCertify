const { getInstitutions, getMembers, updateInstitution, registerInstitution, loginInstitution, joinInstitution } = require('../controllers/institutionController');

const router = require('express').Router();

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
router.get('/members', getMembers);

/**
 * Edit institution details
 */
router.patch('/', updateInstitution);

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

/**
 * Join institution
 */
router.post('/join', joinInstitution);

module.exports = router;
