const { Router } = require('express');

const router = Router();
const asyncHandler = require('../middlewares/asyncHandler');

const { search } = asyncHandler(require('../controllers/searchController'));

router.get('/', search);

module.exports = router;
