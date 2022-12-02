const express = require('express');
const fileUpload = require('express-fileupload');
const { getCertificate, certificateIPFS, saveCertificate } = require('../controllers/certificateController');

const router = express.Router();

router.get('/:certificateId', getCertificate);
router.get('/save', saveCertificate);

router.post('/ipfs', fileUpload(), certificateIPFS);

module.exports = router;