const Router = require('express').Router();
const JournalEntryController = require('../controllers/JournalEntryController')

Router.get('/:user_id', JournalEntryController.GetJournalEntrys);
Router.get('/one/:journeyentry_id', JournalEntryController.GetOneEntry);
Router.post('/create/:user_id', JournalEntryController.CreateJournalEntry)
// Router.post()
// Router.delete('/:journalentry_id', JournalEntryController.DeleteJournalEntry);

module.exports = Router;