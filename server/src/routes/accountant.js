import express from 'express';
import { addFunds, dismissAccountant, getAccountant, getAllAccountants, getTransactions, registerAccountant } from '../controllers/accountantController.js';

const router = express.Router();

router.get('/', getAllAccountants);
router.get('/:walletAddress', getAccountant);
router.get('/:walletAddress/transactions', getTransactions);

router.post('/create', registerAccountant);

router.patch('/:walletAddress/funds/add', addFunds);
router.patch('/:walletAddress/dismiss', dismissAccountant);

export default router;