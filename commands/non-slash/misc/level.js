const GuildRank = require('../../../db/rank')
const { MessageEmbed } = require("discord.js");

let xp_req
function levels(xp) {
    xp_req = 100
    for (let i = 1; i < 2147483647; i++) {
        if (xp <= xp_req) {
            return xp_req;
        }
        xp_req = Math.round(xp_req * 2.3)
    }
}

module.exports = {
    config: {
        name: "check_level",
        aliases: [`${prefix}level`, `${prefix}lvl`, `${prefix}rank`],
        description: "level",
        usage: "level",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let mentioned_user = message.mentions.members.first() || message.member;
        let user

        user = await GuildRank.findOne({ user_id: mentioned_user.id, guild_id: message.guild.id })
    
        if(!user) {
            user = new GuildRank({
                user_id: mentioned_user.id,
                guild_id: message.guild.id,
                level: 1,
                xp: 0
            })
            await user.save();
        }
        
        let xp = user.xp;
        let req_xp = levels(user.xp)
        let embed = new MessageEmbed()
            .setColor("#00ff00")
            .setTitle(`${mentioned_user.user.tag}'s Level`)
            .setDescription(`Level: ${user.level}\nXP: ${xp}/${req_xp}`)
            .setFooter({ text: `Requested by ${message.author.tag}` })
            .setTimestamp()
        message.channel.send({ embeds: [embed] })
    }
}