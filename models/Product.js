const mongoose = require('mongoose')
const {Schema} = mongoose

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    description: { 
      type: String,
      required: true
    },
    image: { 
      type: String,
      required: true
    },
    categories: { 
      type: Array
    },
    size: { 
      type: String
    },
    color: { 
      type: String
    },
    price: { 
      type: Number,
      required: true
    },
  },
  // CreatedAt and UpdatedAt
  {timestamps: true}
)

module.exports = mongoose.model('Product', ProductSchema)
