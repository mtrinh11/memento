const { Schema } = require('mongoose');

module.exports = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: { 
            type: String, 
            required: true
        },
        password_digest: {
            type: String,
            required: true,
        },
        habitId: {type: Schema.Types.ObjectId, ref: 'habits'},
        entries: [{type: Schema.Types.ObjectId, ref:'journalentrys'}]
    },
    { timestamps: true}
)