

const express = require('express');
const router = express.Router();


const User = require('../models/user');
const { signup } = require('../controllers/authController');


router.post('/', signup)

module.exports = router;