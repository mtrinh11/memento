const Router = require('express').Router()

const UserRouter = require('./UserRouter')
const JournalRouter = require('./JournalRouter')

Router.use('/users', UserRouter)
Router.use('/journal', JournalRouter)

module.exports = Router
