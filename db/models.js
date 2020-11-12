const {model} = require('mongoose');

const UserSchema = require('./schema/User');
const JournalEntrySchema = require('./schema/JournalEntry');
const TodoSchema = require('./schema/Todo');
const HabitSchema = require('./schema/Habit');
const DietSchema = require('./schema/DietTracker');

const User = model('users', UserSchema);
const JournalEntry = model('journal_entrys', JournalEntrySchema);
const Todo = model('todos', TodoSchema);
const Habit = model('habits', HabitSchema);
const Diet = model('diets', DietSchema);

module.exports = {
    User,
    JournalEntry,
    Todo,
    Habit,
    Diet
};