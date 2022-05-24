const mongoose = require('mongoose')

const headSchema = mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },
  disablePasswd: {
    type: String,
    required: true,
  },
  Passwd: {
    type: String,
    required: true,
  },
  History:{
    type: Object,
    required: true
  },
})

module.exports = mongoose.model('head', headSchema)
