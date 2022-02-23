const mongoose = require('mongoose') //Schema setting

const schema = mongoose.Schema;

const GuildRank = new schema({

    user_id: {
        type: String, 
        required: true
    },

    guild_id: {
        type: String, 
        required: true
    },

    xp:
    {
        type: Number,
        default:0,
        required: true
    },

    level:
    {
        type: Number,
        default:0,
        required: true
    }
})

module.exports = mongoose.model('GuildRank',GuildRank);