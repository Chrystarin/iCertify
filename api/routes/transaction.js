const fileUpload = require('express-fileupload');
const {
	getTransactions,
	saveIpfs,
	saveTransaction
} = require('../controllers/transactionController');
const router = require('express').Router();

/**
 * Get the transactions
 *
 * walletAddress - optional
 */
router.get('/', getTransactions);

/**
 * Save file to IPFS
 *
 * document (file)
 */
router.post('/ipfs', fileUpload(), saveIpfs);

/**
 * Save the transaction
 *
 * ownerAddress
 * txHash
 */
router.post('/save', saveTransaction);

module.exports = router;
