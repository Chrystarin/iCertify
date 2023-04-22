const { Router } = require('express');

const { onlyUser } = require('../middlewares/authorize');
const router = Router();
const asyncHandler = require('../middlewares/asyncHandler');
const authenticate = require('../middlewares/authenticate');

const { getDocument, updateMode, createAccess, deleteAccess } = asyncHandler(
	require('../controllers/documentController')
);

router.get('/', getDocument);

router.use(authenticate, onlyUser);

router.post('/', createAccess);

router.patch('/', updateMode);

router.delete('/', deleteAccess);

module.exports = router;
