const fileUpload = require('express-fileupload');
const router = require('express').Router();

router.post('/ipfs', fileUpload());

router.post('/send');

module.exports = router;