const express = require('express');
const router = express.Router();
const {
  verifyTokenAndAdmin
} = require('./verifyToken')
const {
  getAllProducts,
  updateProduct,
  createNewProduct,
  deleteProduct,
  getSingleProduct
} = require('../controllers/product');

// Create a new product.
router.post('/', verifyTokenAndAdmin, createNewProduct)

// Update the product with the new product.
router.put('/:id', verifyTokenAndAdmin, updateProduct)

// Delete the product from the store
router.delete('/:id', verifyTokenAndAdmin, deleteProduct)

// Get the product from the store.
router.get('/find/:id', getSingleProduct)

// Get all products.
router.get('/', getAllProducts)

module.exports = router