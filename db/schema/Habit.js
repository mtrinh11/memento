const {Schema} = require('mongoose')

module.exports = new Schema (
    {
        habits: [{type: String}],
    },
    {timestamps: true}
)