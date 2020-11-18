const AppRouter = require('./routes/AppRouter')
const connection = require('./db/connection')

const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3001
const app = express()

//for deployment
const path = require('path');

// Initialize Middleware
app.use(logger('dev'))
app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//for deployment
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Initialize Middleware
app.disable('X-Powered-By')
app.get('/', (req, res) => res.send({ msg: 'Server Working' }))
app.use('/api', AppRouter)

//for deployment
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
)

app.listen(PORT, async () => {
  try {
    await connection
    console.log('Database Connected')
    console.log(`App listening on port: ${PORT}`)
  } catch (error) {
    throw new Error('Connection Error')
  }
})

