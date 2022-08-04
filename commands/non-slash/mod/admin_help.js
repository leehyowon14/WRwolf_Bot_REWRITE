const { EmbedBuilder } = require("discord.js");

module.exports = {
    config: {
        name: "admin_help",
        aliases: [`${prefix}ad_help`],
        description: "help",
        usage: "ad_help",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content: "너는 이 명령을 수행할 권한이 없어." })

        let img = "https://media1.tenor.com/images/8e341309b7d312f35f1869b2ffcaa8e8/tenor.gif?itemid=20146933"
        let embed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('울프봇 (ADMIN)명령어')
            .setAuthor({ name: '울프봇 도움말', iconURL: img })
            .addFields(
                {name: '\u200B', value: '\u200B'},
                {name: `${prefix}ban [멘션]`, value: '밴'},
                {name: `${prefix}kick [멘션]`, value: '킥'},
                {name: `${prefix}mute [멘션]`, value: '입막음(Muted 역할이 없을때는 자동으로 생성됨)'},
                {name: `${prefix}clear, ${prefix}청소`, value: '채팅지우기'},
                {name: `${prefix}unban [멘션]`, value: '언밴'},
                {name: `${prefix}unmute [멘션]`, value: '언뮤트'},
                {name: `${prefix}dj [멘션]`, value: `DJ권한 주기/뺏기 (DJ역할이 없을때는 자동으로 생성됨)`},
                {name: '\u200B', value: '\u200B'}
            )
            .setTimestamp()
            .setFooter({ text:'Developed by sG.wolf#5732', iconURL: img })

        message.channel.send({ embeds: [embed] })
    }
}