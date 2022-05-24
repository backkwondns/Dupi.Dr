// 필수 lib
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')

// router
const DBRouter = require('./router/DB')
const RunRouter = require('./router/Run')
const mongoose = require('mongoose')

// DB model
const signUpModel = require('./model/user')

const app = express()
const PORT = 31000

// DB Conn
mongoose.connect(
  process.env.MONGODB_URL,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('connected!')
    }
  },
)

app.use(cors())
app.use(logger('common'))
app.use(express.json())

// ROUTE
app.use('/DB', DBRouter)
app.use('/run', RunRouter)

app.listen(PORT)
