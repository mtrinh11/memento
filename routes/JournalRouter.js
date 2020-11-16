const Router = require('express').Router();
const JournalEntryController = require('../controllers/JournalEntryController')

Router.get('/:user_id', JournalEntryController.GetJournalEntrys);
Router.get('/one/:journeyentry_id', JournalEntryController.GetOneEntry);
Router.post('/create/:user_id', JournalEntryController.CreateJournalEntry)
Router.put('/update/:post_id', JournalEntryController.UpdateEntry)
Router.delete('/delete/:user_id/:journalentry_id', JournalEntryController.DeleteEntry);

module.exports = Router;