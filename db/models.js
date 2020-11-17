const {model} = require('mongoose');

const UserSchema = require('./schema/User');
const JournalEntrySchema = require('./schema/JournalEntry');
const HabitSchema = require('./schema/Habit');
const CloudImageSchema = require('./schema/CloudImage')


const User = model('users', UserSchema);
const JournalEntry = model('journal_entrys', JournalEntrySchema);
const Habit = model('habits', HabitSchema);
const CloudImage = model('cloudimage', CloudImageSchema)

module.exports = {
    User,
    JournalEntry,
    Habit,
    CloudImage
}; 