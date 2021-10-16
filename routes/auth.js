const express = require('express');
const { createNewUser, loginControl } = require('../controllers/auth');
const router = express.Router();


// Register
router.post('/register', createNewUser)

// Login
router.post('/login', loginControl)


module.exports = router