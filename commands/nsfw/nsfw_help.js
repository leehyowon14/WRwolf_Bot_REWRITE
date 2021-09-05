const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: `nsfw_help`,
        aliases: [`${prefix}nsfw_help`, `${prefix}nsfw`],
        description: "help",
        usage: "help",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if (args[0]) {
            return;
        }
        let img = "https://media1.tenor.com/images/8e341309b7d312f35f1869b2ffcaa8e8/tenor.gif?itemid=20146933"
        let embed = new MessageEmbed()
            .setColor('#5865F2')
            .setTitle('울프봇(NSFW) 명령어')
            .setAuthor('울프봇(NSFW) 도움말', img)
            .addField('\u200B', '\u200B')
            .addField('2D', `${prefix}2danal`, true)
            .addField('\u200B', `${prefix}2dboobs`, true)
            .addField('\u200B', `${prefix}2dfeet`, true)
            .addField('\u200B', `${prefix}2dfeetgif`, true)
            .addField('\u200B', `${prefix}2dtits`, true)
            .addField('\u200B', '\u200B')
            .addField('Other', `${prefix}cumart`, true)
            .addField('\u200B', `${prefix}cumslut`, true)
            .addField('\u200B', `${prefix}ero`, true)
            .addField('\u200B', `${prefix}erokitsune`, true)
            .addField('\u200B', `${prefix}eroyuri`, true)
            .addField('\u200B', `${prefix}feetgif`, true)
            .addField('\u200B', `${prefix}feet`, true)
            .addField('\u200B', `${prefix}femdom`, true)
            .addField('\u200B', `${prefix}futanari`, true)
            .addField('\u200B', `${prefix}gasm`, true)
            .addField('\u200B', `${prefix}girlsologif`, true)
            .addField('\u200B', `${prefix}girlsolo`, true)
            .addField('\u200B', `${prefix}hentaigif`, true)
            .addField('\u200B', `${prefix}hentai`, true)
            .addField('\u200B', `${prefix}holo`, true)
            .addField('\u200B', `${prefix}holoero`, true)
            .addField('\u200B', `${prefix}keta`, true)
            .addField('\u200B', `${prefix}kitsune`, true)
        let embed2 = new MessageEmbed()
            .setColor('#5865F2')
            .addField('\u200B', `${prefix}kuni`, true)
            .addField('\u200B', `${prefix}lesbian`, true)
            .addField('\u200B', `${prefix}lewdavatar`, true)
            .addField('\u200B', `${prefix}lewdneko`, true)
            .addField('\u200B', `${prefix}lewdnekogif`, true)
            .addField('\u200B', `${prefix}pussyart`, true)
            .addField('\u200B', `${prefix}pussy`, true)
            .addField('\u200B', `${prefix}pussywankgif`, true)
            .addField('\u200B', `${prefix}yuri`, true)
            .addField('\u200B', `${prefix}trap`, true)
            .addField('\u200B', '\u200B')
            .addField(`NSFW 주의사항`, `NSFW컨텐츠를 보기 위해서는 채널이 NSFW채널이어야 합니다.`)
            .addField(`설정 방법`, `채널 편집(채널 설정) - 일반 - "연령제한 채널" 을 켜주세요.`)
            .setTimestamp()
            .setFooter('Developed by sG.wolf#7777', img)

        message.channel.send({ embeds: [embed, embed2] })
    }
}