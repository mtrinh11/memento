const {model} = require('mongoose');

const UserSchema = require('./schema/User');
const JournalEntrySchema = require('./schema/JournalEntry');
const HabitSchema = require('./schema/Habit');


const User = model('users', UserSchema);
const JournalEntry = model('journal_entrys', JournalEntrySchema);
const Habit = model('habits', HabitSchema);

module.exports = {
    User,
    JournalEntry,
    Habit,
};