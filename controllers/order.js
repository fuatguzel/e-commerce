const Order = require('../models/order')

//Desc: Create a new order
//Parameters: @req.body
//Url: /orders
//Method: POST
//Error: status code 500
exports.createNewOrder = async (req, res) => {
  const newOrder = new Order(req.body)
  try {
    const savedOrder = await newOrder.save()
    res.status(200).json(savedOrder)
  } catch (error) {
    res.status(500).json(error)
  }
}

//Desc: Update an order
//Parameters: @id
//Url: /orders/:id
//Method: PUT
//Error: status code 500
exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id, {
        $set: req.body
      }, {
        new: true
      }
    )
    res.status(200).json(updatedOrder)
  } catch (error) {
    res.status(500).json(error)
  }
}

//Desc: Delete an order
//Parameters: @id
//Url: /orders/:id
//Method: DELETE
//Error: status code 500
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id)
    res.status(200).json("Order successfully deleted.")
  } catch (error) {
    res.status(500).json(error)
  }
}

//Desc: Get a single order
//Parameters: @id
//Url: /orders/:id
//Method: GET
//Error: status code 500
exports.getSingleOrder = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId
    })
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json(error)
  }
}

//Desc: Get all orders
//Parameters: -
//Url: /orders
//Method: GET
//Error: status code 500
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json(error)
  }
}

//Desc: Get income info
//Parameters: @createdAt
//Url: /orders/income
//Method: GET
//Error: status code 500
exports.getIncome = async (req, res) => {
  const date = new Date()
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
  try {
    const income = Order.aggregate([
      { 
        $match: {createdAt: { $gte: previousMonth}}
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount"
        }
      },
      {
        $group: {
          _id: "$month",
          total: {$sum: "$sales"}
        }
      }
    ])
    res.status(200).json(income)
  } catch (error) {
    res.status(500).json(error)
  }
}
