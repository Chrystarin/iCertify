const router = require('express').Router();

const asyncHandler = require('../middlewares/asyncHandler');

const { getDocument, getOwner } = asyncHandler(require('../controllers/accessController'));

router.get('/:accessCode', getDocument);
router.get('/:acceesCode/owner', getOwner);

module.exports = router;
