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
        if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")

        var banlist = await message.channel.guild.fetchBans()
        console.log({banlist})
        var bannedMember = banlist.find(x => x.user.username == args[0])
        console.log({bannedMember});
        if(!bannedMember) {
            return message.channel.send("Please provide a username to unban someone!")
        }

        let reason = args.slice(1).join(" ")
        if(!reason) reason = "그냥 강퇴다 임마."

        if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command!")
        try {
            message.channel.send(`${bannedMember.user}의 밴이 해제되었습니다.`)
            message.guild.members.unban(bannedMember.user.id, reason)
        } catch(e) {
            console.log(e.message)
        }

        let embed = new MessageEmbed()
        .setColor(bot.colours.redlight)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "unban")
        .addField("Moderated on:", `${bannedMember.username} (${bannedMember.id})`)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date:", message.createdAt.toLocaleString())

        try {
            sysch.send(embed)
        } catch (error) {
            message.channel.send(embed)
        }
    }
}
