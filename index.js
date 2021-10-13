const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')

dotenv.config()

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to the DB successfully.'))
  .catch((err) => console.log(err))

  app.use(express.json())
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/products', productRoute)
app.use('/api/v1/carts', cartRoute)
app.use('/api/v1/orders', orderRoute)

app.listen(process.env.PORT || 5000, (req, res) => {
  console.log("Server is running...")
})