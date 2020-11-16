const {Habit, User} = require('../db/models')
const {Schema} = require('mongoose')

const GetHabits = async (req, res) =>{
    try {
        const user = await User.findById(req.params.user_id)
        const habitId = user.habitId
        if (habitId){
            const habitArray = await Habit.findById(habitId)
            res.send(habitArray) 
        } else {
            res.send({msg: false})
        }
    } catch (error) {
        res.send({msg: false})
        throw error
    }
}

const CreateHabitTracker = async(req,res) => {
    try {
        const newTracker = new Habit({habits:[]});
        newTracker.save();
        await User.updateOne({_id: req.params.user_id},
            {$push: {habitId: newTracker._id}}
        )
        res.send(newTracker)
    } catch (error) {
        throw error
    }
}

const UpdateHabitTracker = async(req, res) => {
    try {
        await Habit.findByIdAndUpdate(
            req.params.habit_id,
            {
                ...req.body
            },
            { new: true, useFindAndModify: false }
        )
        res.send({msg: 'success'})
    } catch (error) {
        throw error
    }
}

const DeleteHabitTracker = async(req, res) => {
    try {
        await User.update({_id: req.params.user_id}, {$unset: {habitId: "" }});
        await Habit.deleteOne({_id: req.params.habit_id})
        res.send({msg: 'success'})
    } catch(error) {
        throw error
    }
}

module.exports = {
    GetHabits,
    CreateHabitTracker,
    UpdateHabitTracker,
    DeleteHabitTracker
}