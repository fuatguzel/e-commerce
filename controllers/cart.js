const Cart = require('../models/cart')

//Desc: Create a new cart
//Parameters: @req.body
//Url: /carts
//Method: POST
//Error: status code 500
exports.createNewCart = async (req, res) => {
  const newCart = new Cart(req.body)

  try {
    const savedCart = await newCart.save()
    res.status(200).json(savedCart)
  } catch (error) {
    res.status(500).json(error)
  }
}

//Desc: Update a cart
//Parameters: @id
//Url: /carts/:id
//Method: PUT
//Error: status code 500
exports.updateCart = async (req, res) => {
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
}

//Desc: Delete a cart
//Parameters: @id
//Url: /carts/:id
//Method: DELETE
//Error: status code 500
exports.deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id)
    res.status(200).json("Cart successfully deleted.")
  } catch (error) {
    res.status(500).json(error)
  }
}

//Desc: Get a single cart
//Parameters: @id
//Url: /carts/:id
//Method: GET
//Error: status code 500
exports.getSingleCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.params.userId
    })
    res.status(200).json(cart)
  } catch (error) {
    res.status(500).json(error)
  }
}

//Desc: Get all carts
//Parameters: -
//Url: /carts
//Method: GET
//Error: status code 500
exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find()
    res.status(200).json(carts)
  } catch (error) {
    res.status(500).json(error)
  }
}