const express = require('express');
const router = express.Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} = require('./verifyToken');
const { updateUser, getAllUsers, getSingleUser, getStats, deleteUser } = require('../controllers/user');

// Update
router.put('/:id', verifyTokenAndAuthorization, updateUser)

// Delete
router.delete('/:id', verifyTokenAndAuthorization, deleteUser)

// Get User
router.get('/find/:id', verifyTokenAndAdmin, getSingleUser)

// Get All Users
router.get('/', verifyTokenAndAdmin, getAllUsers)

router.get('/stats', verifyTokenAndAdmin, getStats)

module.exports = router