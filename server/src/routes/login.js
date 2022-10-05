const express = require('express');
const router = express.Router();
const { loginEmail } = require('../controllers/loginController');

router.post('/login', loginEmail)

module.exports = router;
