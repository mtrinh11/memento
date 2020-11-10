const mongoose = require('mongoose')

const connection = mongoose.connect('mongodb://localhost:27017/memento', {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

mongoose.set('debug', true)

module.exports = connection;