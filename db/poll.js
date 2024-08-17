const mongoose = require('mongoose') //Schema setting

const schema = mongoose.Schema;

const Poll = new schema({
    poll_id: {
        type: String, 
        required: true
    },
    end_date:
    {
        type: Number,
        required: true
    },
    poll_array: {
        type: Array,
        required: true // 투표 참여자 아이디 [[id, id, id], [id, id, id], [id, id, id]]
    }
})

module.exports = mongoose.model('Poll',Poll);