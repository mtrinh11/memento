const Router = require('express').Router()

const UserRouter = require('./UserRouter')
const JournalRouter = require('./JournalRouter')
const HabitsRouter = require('./HabitsRouter')
const CloudinaryRouter = require('./CloudinaryRouter')

Router.use('/users', UserRouter)
Router.use('/journal', JournalRouter)
Router.use('/habits', HabitsRouter)
Router.use('/cloud', CloudinaryRouter)

module.exports = Router
