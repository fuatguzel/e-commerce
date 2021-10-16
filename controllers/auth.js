const User = require('../models/User');
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

//Desc: Create a new User
//Parameters: @req.body
//Url: /auth/register
//Method: POST
//Error: status code 500
exports.createNewUser = async (req, res) => {
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
    const {
      password,
      ...others
    } = user._doc;
    res.status(201).json(others)
  } catch (error) {
    res.status(500).json(error)
  }
}

//Desc: Login 
//Parameters: @userName, @password
//Url: /auth/login
//Method: POST
//Error: status code 500
exports.loginControl = async (req, res) => {
  try {
    const user = await User.findOne({
      userName: req.body.userName
    }) 
    
    !user && res.status(401).json("Wrong credentials!")

    // Decrypt the password
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SECRET_KEY
    )

    const decryptedPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    decryptedPassword !== req.body.password && res.status(401).json("Wrong credentials!")

    const accessToken = jwt.sign({
        id: user.id,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET_KEY, {
        expiresIn: '1d'
      } // 1 day later will expire
    )

    const {
      password,
      ...others
    } = user._doc;

    res.status(200).json({
      ...others,
      accessToken
    });
  } catch (error) {
    res.statusCode(500).json(error)
  }
}