const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "admin_help",
        aliases: [`${prefix}ad_help`],
        description: "help",
        usage: "ad_help",
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
            .addField(`${prefix}addrole [멘션] [역할멘션]', '역할추가`)
            .addField(`${prefix}ban [멘션]`, '밴')
            .addField(`${prefix}kick [멘션]`, '킥')
            .addField(`${prefix}mute [멘션]`, '입막음(Muted 역할이 없을때는 자동으로 생성됨)')
            .addField(`${prefix}clear, ${prefix}청소`, '채팅지우기')
            .addField(`${prefix}removerole [멘션] [역할멘션]`, '역할 제거')
            .addField(`${prefix}unban [멘션]`, '언밴')
            .addField(`${prefix}unmute [멘션]`, '언뮤트')
            .addField(`${prefix}DJ [멘션]`, `DJ권한 주기/뺏기 (DJ역할이 없을때는 자동으로 생성됨)`)
            .addField('\u200B', '\u200B')
            .setTimestamp()
            .setFooter('Developed by sG.wolf#5070', img)

        message.channel.send(embed)
    }
}