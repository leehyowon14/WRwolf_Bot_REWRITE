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
            .setAuthor({ name: '울프봇(NSFW) 도움말', url: img })
            .addField('\u200B', '\u200B')
            .addField('2D', `${prefix}hthigh`, true)
            .addField('\u200B', `${prefix}paizuri`, true)
            .addField('\u200B', `${prefix}tentacle`, true)
            .addField('\u200B', `${prefix}hboobs`, true)
            .addField('\u200B', `${prefix}hentai`, true)
            .addField('\u200B', `${prefix}hmidriff`, true)
            .addField('\u200B', `${prefix}hass`, true)
            .addField('\u200B', `${prefix}hneko`, true)
            .addField('\u200B', `${prefix}hkitsune`, true)
            .addField('\u200B', `${prefix}hanal`, true)
            .addField('\u200B', '\u200B')
            .addField('3D', `${prefix}gonewild`, true)
            .addField('\u200B', `${prefix}ass`, true)
            .addField('\u200B', `${prefix}pussy`, true)
            .addField('\u200B', `${prefix}thigh`, true)
            .addField('\u200B', `${prefix}boobs`, true)
            .addField('\u200B', `${prefix}pgif`, true)
            .addField('\u200B', `${prefix}anal`, true)
            .addField('\u200B', `${prefix}4k`, true)
            .setTimestamp()
            .setFooter({ text: 'Developed by sG.wolf#5732', iconURL: img })

        message.channel.send({ embeds: [embed] })
    }
}