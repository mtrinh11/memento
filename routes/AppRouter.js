const Router = require('express').Router()

const UserRouter = require('./UserRouter')
const JournalRouter = require('./JournalRouter')
const HabitsRouter = require('./HabitsRouter')

Router.use('/users', UserRouter)
Router.use('/journal', JournalRouter)
Router.use('/habits', HabitsRouter)

module.exports = Router
