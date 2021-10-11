const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to the DB successfully.'))
  .catch((err) => console.log(err))

app.listen('3100', (req, res) => {
  console.log(`listening on port 3100`)
})