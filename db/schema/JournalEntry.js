const { Schema } = require('mongoose');

module.exports = new Schema(
    {
        date: {type: String, required: true},
        entry: {type: String, required: true},
        todoList: {type: Schema.Types.ObjectId, ref: 'todos'},
        habitTracker: {type: Schema.Types.ObjectId, ref: 'habits'},
        dietTracker: {type:Schema.Types.ObjectId, ref: 'diets'},
        sleep: {type: Number, required: false}
    },
    {timestamps: true}
)