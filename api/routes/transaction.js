const fileUpload = require('express-fileupload');
const router = require('express').Router();

const asyncHandler = require('../middlewares/asyncHandler');
const { onlyInstitution } = require('../middlewares/authorize');
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
router.post('/ipfs', fileUpload(), onlyInstitution, saveIpfs);

/**
 * Save the transaction
 *
 * ownerAddress
 * txHash
 */
router.post('/save', onlyInstitution, saveTransaction);

module.exports = router;
