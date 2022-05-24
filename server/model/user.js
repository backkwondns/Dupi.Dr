const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: {
    type:String,
    required: true
  },
  _passwd: {
    type:String,
    required: true
  },
  _gender: {
    type:String,
    required: true
  },
  _age: {
    type: Number,
    required: true
  },
  _height: {
    type: Number,
    required: true
  },
  _weight: {
    type: Number,
    required: true
  },
  _DATE: {
    type: Date,
    default: Date.now
  }
})



module.exports = mongoose.model('USER_LIST', userSchema)
