const express = require('express');
const router = express.Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} = require('./verifyToken')
const {
  createNewCart,
  updateCart,
  deleteCart,
  getSingleCart,
  getAllCarts
} = require('../controllers/cart');

// Create a new Cart instance.
router.post('/', verifyToken, createNewCart)

// Update cart.
router.put('/:id', verifyTokenAndAuthorization, updateCart)

// Delete the cart from the database.
router.delete('/:id', verifyTokenAndAuthorization, deleteCart)

// Get the user cart data from the database.
router.get('/find/:userId', verifyTokenAndAuthorization, getSingleCart)

// Get all cart items from the database.
router.get('/', verifyTokenAndAdmin, getAllCarts)


module.exports = router