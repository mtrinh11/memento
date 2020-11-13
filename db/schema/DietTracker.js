const {Schema} = require('mongoose');

module.exports = new Schema (
    {
        diet: [{type: String}]
    },
    {timestamps:true}
)