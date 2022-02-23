const mongoose = require('mongoose') //Schema setting

const schema = mongoose.Schema;

const meal = new schema({

    user_id: {
        type: Number, 
        required: true
    },
    school_type:
    {
        type: String,
        required: true
    },
    school_name:
    {
        type: String,
        required: true
    },
    school_region:
    {
        type: String,
        required: true
    },
    school_code:
    {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('meal',meal);