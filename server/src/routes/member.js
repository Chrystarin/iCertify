const express = require('express');
const router = express.Router();
const { getMember } = require('../controllers/memberController')

router.post('/members', getMember)

module.exports = router;