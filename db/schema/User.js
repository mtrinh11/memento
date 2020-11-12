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
        entries: [{type: Schema.Types.ObjectId, ref:'journalentrys'}]
    },
    { timestamps: true}
)