const { Schema } = require('mongoose');

module.exports = new Schema(
    {
        todolist: [{type: String}],
    },
    {timestamps: true}
)