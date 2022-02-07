const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "ban",
        aliases: [`${prefix}ban`],
        description: "특정유저 밴",
        usage: "ban <@username>",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        if(!message.member.permissions.has(["BAN_MEMBERS"]) && message.author.id != adminId) return message.channel.send({ content: "유저가 이 명령을 수행할 권한을 가지고 있지 않습니다." })

        let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
        if(!banMember) return message.channel.send({ content: "오류: 밴 할 유저를 멘션하지 않으셨습니다." })

        let reason = args.slice(1).join(" ");
        if(!reason) reason = "그냥 강퇴다 임마."

        if(!message.guild.me.permissions.has(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send({ content: "오류: 봇이 이 명령어를 수행할 권한을 가지고 있지 않습니다." })

        banMember.send({ content: `안녕! 넌 \`\`${message.guild.name}\`\`에서 밴당했어!\n이유 -> \`\`${reason}\`\`` }).then(() => 
        banMember.ban({ days: 0, reason: reason })).catch(err => console.log(err))
        // message.guild.members.cache.ban(banMember, { days: 0, reason: reason})).catch(err => console.log(err))

        message.channel.send({content: `**${banMember.user.tag}** has been banned`})

        let embed = new MessageEmbed()
        .setColor(bot.colours.redlight)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "ban")
        .addField("User:", banMember.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date:", message.createdAt.toLocaleString())

        try {
            sysch.send({ embeds: [embed] })
        } catch (error) {
            message.channel.send({ embeds: [embed] })
        }
    }
}