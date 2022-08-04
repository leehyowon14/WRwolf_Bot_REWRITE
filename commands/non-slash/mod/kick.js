const { EmbedBuilder } = require("discord.js")

module.exports = {
    config: {
        name: "kick",
        aliases: [`${prefix}kick`],
        description: "특정유저 추방",
        usage: "kick <@username>",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        if(!message.member.permissions.has(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send({ content: "유저가 이 명령을 수행할 권한을 가지고 있지 않습니다" })

        let kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
        if(!kickMember) return message.channel.send({ content: "오류: 킥할 유저를 멘션하지 않으셨습니다" })

        let reason = args.slice(1).join(" ")
        if(!reason) reason = "그냥 강퇴다 임마."

        if(!message.guild.me.permissions.has(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send({ content: "오류: 봇이 이 명령을 수행할 권한을 가지지 않았습니다." })

        kickMember.send({ content: `안녕! 넌 \`\`${message.guild.name}\`\`에서 강퇴당했어!\n이유 -> \`\`${reason}\`\`` }).then(() => 
        kickMember.kick()).catch(err => console.log(err))

        message.channel.send({content:`**${kickMember.user.tag}** has been kicked`})

        let embed = new EmbedBuilder()
        .setColor(bot.colours.redlight)
        .setAuthor({ name: `${message.guild.name} Modlogs`, iconURL: message.guild.iconURL })
        .addFields(
            [
                {name: "Moderation:", value: "kick"},
                {name: "User:", value: kickMember.user.username},
                {name: "Moderator:", value: message.author.username},
                {name: "Reason:", value: reason},
                {name: "Date:", value: message.createdAt.toLocaleString()},
            ]
        )

        try {
            sysch.send({ embeds: [embed] })
        } catch (error) {
            message.channel.send({ embeds: [embed] })
        }
    }
}