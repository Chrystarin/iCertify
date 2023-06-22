const fileUpload = require('express-fileupload');
const { Router } = require('express');

const { onlyInstitution } = require('../middlewares/authorize');
const router = Router();
const asyncHandler = require('../middlewares/asyncHandler');

const { getTransactions, saveIpfs, saveTransaction } = asyncHandler(
	require('../controllers/transactionController')
);

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
router.post('/ipfs', fileUpload({ limits: { fileSize: 5 * 1024 * 1024 }, abortOnLimit: true }), onlyInstitution, saveIpfs);

/**
 * Save the transaction
 *
 * requestId
 * walletAddress
 * txHash
 */
router.post('/save', onlyInstitution, saveTransaction);

module.exports = router;
