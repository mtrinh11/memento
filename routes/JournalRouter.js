const Router = require('express').Router();
const JournalEntryController = require('../controllers/JournalEntryController')

// Router.get('/all'. JournalEntryController.GetJournalEntrys);
Router.post('/create/:user_id', JournalEntryController.CreateJournalEntry)
// Router.post()
// Router.delete('/:journalentry_id', JournalEntryController.DeleteJournalEntry);

module.exports = Router;