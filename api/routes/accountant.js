const express = require('express');
const { addFunds, dismissAccountant, getAccountant, getAllAccountants, getTransactions, registerAccountant } = require('../controllers/accountantController');

const router = express.Router();

router.get('/', getAllAccountants);
router.get('/:walletAddress', getAccountant);
router.get('/:walletAddress/transactions', getTransactions);

router.post('/create', registerAccountant);

router.patch('/:walletAddress/funds/add', addFunds);
router.patch('/:walletAddress/dismiss', dismissAccountant);

module.exports = router;