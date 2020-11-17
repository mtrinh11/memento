const { Schema } = require('mongoose');

module.exports = new Schema(
    {
        date: {type: String, required: true},
        entry: {type: String, required: true},
        todoList: [{type: String, required: false}],
        dietTracker: [{type: String, required: false}],
        sleep: {type: Number, required: false},
        habits: [{type: Object, required: false}],
        imgUrls: [{type: String, required: false}],
    },
    {timestamps: true}
)