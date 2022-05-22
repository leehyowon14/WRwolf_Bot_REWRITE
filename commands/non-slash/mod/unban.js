const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "unban",
        aliases: [`${prefix}unban`],
        description: "밴 헤제",
        usage: "unban <username> <reason>",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        if(!message.member.permissions.has(["BAN_MEMBERS"]) && message.author.id != adminId) return message.channel.send({ content: "너는 이 명령을 수행할 권한이 없어." })

        var banlist = await message.channel.guild.bans.fetch()
        console.log({banlist})
        var bannedMember = banlist.find(x => x.user.username == args[0])
        console.log({bannedMember});
        if(!bannedMember) {
            return message.channel.send({ content: "밴을 풀어줄 유저의 이름과 함께 사용하여 주세요." })
        }

        let reason = args.slice(1).join(" ")
        if(!reason) reason = "이유 없음."

        if(!message.guild.me.permissions.has(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send({ content: "저에게 이 명령을 수행할 권한이 없습니다." })
        try {
            message.channel.send({ content: `${bannedMember.user}의 밴이 해제되었습니다.` })
            message.guild.members.unban(bannedMember.user.id, reason)
        } catch(e) {
            console.log(e.message)
        }

        let embed = new MessageEmbed()
        .setColor(bot.colours.redlight)
        .setAuthor({ name: `${message.guild.name} Modlogs`, iconURL: message.guild.iconURL })
        .addField("Moderation:", "unban")
        .addField("Moderated on:", `${bannedMember.username} (${bannedMember.id})`)
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
