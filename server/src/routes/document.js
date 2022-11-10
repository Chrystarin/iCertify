import express from 'express';
import { getDocument, saveDocument } from '../controllers/documentController.js';

const router = express.Router();

router.get('/:documentId', getDocument);

router.post('/save', saveDocument);

export default router;