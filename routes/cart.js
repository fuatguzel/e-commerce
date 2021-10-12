const express = require('express');
const router = express.Router();
const Cart = require('../models/cart')
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} = require('./verifyToken')

// Create a new Cart instance.
router.post('/', verifyToken, async (req, res) => {
  const newCart = new Cart(req.body)

  try {
    const savedCart = await newCart.save()
    res.status(200).json(savedCart)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Update cart.
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id, {
        $set: req.body
      }, {
        new: true
      })
    res.status(200).json(updatedCart)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Delete the cart from the database.
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id)
    res.status(200).json("Cart successfully deleted.")
  } catch (error) {
    res.status(500).json(error)
  }
})

// Get the user cart data from the database.
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.params.userId
    })
    res.status(200).json(cart)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Get all cart items from the database.
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find()
    res.status(200).json(carts)
  } catch (error) {
    res.status(500).json(error)
  }
})


module.exports = router