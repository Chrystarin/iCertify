import express from 'express';
import { getAllTransactions, getTransaction, saveTransaction } from '../controllers/transactionController.js';

const router = express.Router();

router.get('/', getAllTransactions);
router.get('/:hash', getTransaction);

router.post('/save', saveTransaction);

export default router;