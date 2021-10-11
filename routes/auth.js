const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register
router.post('/register', async(req, res) => {
  const newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  })

  try {
    // Save to DB
    const user = await newUser.save()
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router