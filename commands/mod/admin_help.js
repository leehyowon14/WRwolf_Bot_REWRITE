const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "help",
        aliases: [`${prefix}ad_help`],
        description: "help",
        usage: "help",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You do not have permission to perform this command!")

        let img = "https://media1.tenor.com/images/8e341309b7d312f35f1869b2ffcaa8e8/tenor.gif?itemid=20146933"
        let embed = new MessageEmbed()
            .setColor('#73c4fa')
            .setTitle('울프봇 (ADMIN)명령어')
            .setAuthor('울프봇 도움말', img)
            .addField('\u200B', '\u200B')
            .addField('!addrole [멘션] [역할멘션]', '역할추가')
            .addField('!ban [멘션]', '밴')
            .addField('!kick [멘션]', '킥')
            .addField('!mute [멘션]', '입막음')
            .addField('!clear, !청소', '채팅지우기')
            .addField('!removerole [멘션] [역할멘션]', '역할 제거')
            .addField('!unban [멘션]', '언밴')
            .addField('!unmute [선택지1 선택지2....]', '언뮤트')
            .addField('\u200B', '\u200B')
            .setTimestamp()
            .setFooter('Developed by 느윽대#5070', img)

        message.channel.send(embed)
    }
}