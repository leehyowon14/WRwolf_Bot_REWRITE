const mongoose = require('mongoose') //Schema setting

const schema = mongoose.Schema;

const Tracking_number = new schema({

    user_id: {
        type: Number, 
        required: true
    },
    org:
    {
        type: String,
        required: true
    },
    num: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Tracking_number', Tracking_number);