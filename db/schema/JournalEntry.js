const { Schema } = require('mongoose');

module.exports = new Schema(
    {
        date: {type: String, required: true},
        entry: {type: String, required: true},
        todoList: {type: Schema.Types.ObjectId, ref: 'todos'},
        dietTracker: {type:Schema.Types.ObjectId, ref: 'diets'},
        sleep: {type: Number, required: false},
        habits: [{type: String, required: false}]
    },
    {timestamps: true}
)