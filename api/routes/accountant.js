const express = require('express');
const {
    addFunds,
    dismissAccountant,
    getAccountant,
    getAllAccountants,
    getTransactions,
    registerAccountant
} = require('../controllers/accountantController');

const router = express.Router();

// Accountant
router.get('/:walletAddress', getAccountant);
router.get('/:walletAddress/transactions', getTransactions);

// Admin Only
router.get('/', getAllAccountants);

router.post('/create', registerAccountant);

router.patch('/:walletAddress/funds/add', addFunds);
router.patch('/:walletAddress/dismiss', dismissAccountant);

module.exports = router;