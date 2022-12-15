const express = require('express');
const fileUpload = require('express-fileupload');
const { getCertificate, certificateIPFS, saveCertificate } = require('../controllers/certificateController');

const router = express.Router();

// Public
router.get('/:certificateId', getCertificate);

// Accountant
router.post('/save', saveCertificate);
router.post('/ipfs', fileUpload(), certificateIPFS);

module.exports = router;