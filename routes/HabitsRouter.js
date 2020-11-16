const Router = require('express').Router();
const HabitsController = require('../controllers/HabitsController');

Router.get('/current/:user_id', HabitsController.GetHabits)
Router.post('/create/:user_id', HabitsController.CreateHabitTracker)
Router.put('/update/:habit_id', HabitsController.UpdateHabitTracker)
Router.delete('/delete/:user_id/:habit_id', HabitsController.DeleteHabitTracker);

module.exports = Router;