const express = require('express');
const router = express.Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

// Register
router.post('/register', async(req, res) => {
  const newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET_KEY
    ).toString()
  })

  try {
    // Save to DB
    const user = await newUser.save()
    const { password, ...others} = user._doc;
    res.status(201).json(others)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Login
router.post('/login', async(req, res) => {
  try{
    const user = await User.findOne({userName: req.body.userName})
    !user && res.status(401).json("Wron credentials!")

    // Decrypt the password
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SECRET_KEY
    )
    
    const decryptedPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    decryptedPassword !== req.body.password && res.status(401).json("Wron credentials!")

    const accessToken = jwt.sign({
      id: user.id,
      isAdmin: user.isAdmin
    }, 
      process.env.JWT_SECRET_KEY,
      {expiresIn:'1d'} // 1 day later will expire
    )

    const { password, ...others} = user._doc;

    res.status(200).json({...others, accessToken});
  } catch(error) {
    res.statusCode(500).json(error)
  }
})


module.exports = router