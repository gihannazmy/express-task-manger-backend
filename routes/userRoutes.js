

const express = require('express');
const router = express.Router();


const User = require('../models/user');
const { signup, login } = require('../controllers/authController');


router.post('/', signup)
router.get('/', login)


module.exports = router;