const express = require('express');
const {
  createNewOrder,
  updateOrder,
  deleteOrder,
  getSingleOrder,
  getAllOrders,
  getIncome
} = require('../controllers/order');
const router = express.Router();
const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin
} = require('./verifyToken')

// Create a new Order.
router.post('/', verifyToken, createNewOrder)

// Update order.
router.put('/:id', verifyTokenAndAdmin, updateOrder)

// Delete order from the database.
router.delete('/:id', verifyTokenAndAdmin, deleteOrder)

// Get user orders from the database.
router.get('/find/:userId', verifyTokenAndAuthorization, getSingleOrder)

// Get all orders from the database.
router.get('/', verifyTokenAndAdmin, getAllOrders)

// Get Incomes orders from the database.
router.get('/income', verifyTokenAndAdmin, getIncome)

module.exports = router