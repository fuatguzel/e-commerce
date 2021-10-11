const mongoose = require('mongoose')
const {Schema} = mongoose.Schema

const OrderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true
    },
    products: [
      {
        productId: { 
          type: String
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ],
    amount: {
      type: Number,
      required: true
    },
    adress: {
      type: Object,
      required: true
    },
    status: {
      type: String,
      default: 'pending'
    }
  },
  // CreatedAt and UpdatedAt
  {timestamps: true}
)

module.exports = mongoose.model('Order', OrderSchema)