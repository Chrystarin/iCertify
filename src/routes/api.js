const express = require('express');
const router = express.Router();
const { transferView, mintView, retrieveView } = require('../controllers/apiController');

router.post('/transfer', transferView);
router.post('/mint', mintView);
router.post('/retrieve', retrieveView);

module.exports = router;