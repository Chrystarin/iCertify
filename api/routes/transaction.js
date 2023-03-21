const fileUpload = require('express-fileupload');
const {
	getTransactions,
	saveIpfs,
	saveTransaction
} = require('../controllers/transactionController');
const { onlyInstitution } = require('../middlewares/authorize');
const router = require('express').Router();

/**
 * Get the transactions
 *
 * walletAddress - optional
 * hash - optional
 */
router.get('/', getTransactions);

/**
 * Save file to IPFS
 *
 * document (file)
 */
router.post('/ipfs', fileUpload(), onlyInstitution, saveIpfs);

/**
 * Save the transaction
 *
 * ownerAddress
 * txHash
 */
router.post('/save', onlyInstitution, saveTransaction);

module.exports = router;
