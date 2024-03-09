const mongoose = require('mongoose') //Schema setting

const schema = mongoose.Schema;

const Protection_channel = new schema({

    channel_id: {
        type: Number, 
        required: true
    },
    register_date:
    {
        type: String,
        required: true
    },
    is_Activated: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Protection_channel',Protection_channel);