const GuildRank = require('../../../db/rank')
const { EmbedBuilder } = require("discord.js");

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

        if (message.member && args[0]) {
            mentioned_user = parseInt(args[0])
        } else {
            mentioned_user = mentioned_user.id
        }

        try {
            const memberExists = message.guild.members.cache.has(mentioned_user);
            if (!memberExists || memberExists == NaN) {
                return message.reply("해당 ID를 가진 멤버는 이 서버에 존재하지 않습니다.");
            }
        } catch (e) {
            return message.reply("해당 ID를 가진 멤버는 이 서버에 존재하지 않습니다.");
        }

        user = await GuildRank.findOne({ user_id: mentioned_user || parseInt(args[0]), guild_id: message.guild.id })
    
        if(!user) {
            user = new GuildRank({
                user_id: mentioned_user,
                guild_id: message.guild.id,
                level: 1,
                xp: 0
            })
            await user.save();
        }
        
        let xp = user.xp;
        let req_xp = levels(user.xp)
        let embed = new EmbedBuilder()
            .setColor("#00ff00")
            .setTitle(`${mentioned_user.user.tag}'s Level`)
            .setDescription(`Level: ${user.level}\nXP: ${xp}/${req_xp}`)
            .setFooter({ text: `Requested by ${message.author.tag}` })
            .setTimestamp()
        message.channel.send({ embeds: [embed] })
    }
}