const mongoose = require('mongoose')

const solutionSchema = mongoose.Schema({
  result: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('solution', solutionSchema)
