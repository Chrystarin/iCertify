const express = require('express');
const { getAllTransactions, getTransaction, saveTransaction } = require('../controllers/transactionController');

const router = express.Router();

// Accountant
router.get('/', getAllTransactions);
router.get('/:hash', getTransaction);

router.post('/save', saveTransaction);

module.exports = router;