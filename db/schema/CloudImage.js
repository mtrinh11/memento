const { Schema} = require('mongoose')

module.exports = new Schema(
  {
    url: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)
