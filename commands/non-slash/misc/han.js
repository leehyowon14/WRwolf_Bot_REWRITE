const axios = require('axios');
const { EmbedBuilder } = require("discord.js");
module.exports = {
    config: {
        name: `river`,
        aliases: [`${prefix}한강`, `${prefix}river`],
        description: "한강 수온",
        usage: "한강",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if (args[0]) {
            return;
        }
        axios.get(`https://api.hangang.life`)
            .then(function (response) {
                if (response.status == 200) {
                    let river = response.data
                    if (river.STATUS == "OK") {
                        river = river.DATAs.DATA.HANGANG.노량진
                    } else {
                        let embed = new EmbedBuilder()
                            .setColor('#ED4245')
                            .setAuthor({ name :`에러!` })
                            .addFields({name: "Error", value: error})
                            .setTimestamp()
                            .setFooter({ text: 'Developed by Wonny._.lee' })
                        return message.channel.send({ embeds: [embed] })
                    }
                    let embed = new EmbedBuilder()
                        .setColor('#4fe8a3')
                        .setTitle('한강 수온')
                        .setDescription(`측정 위치: 노량진, pH 농도: ${river.PH}`)
                        .addFields({name: ':droplet: ' + river.TEMP, value: '측정 시각: ' + river.LAST_UPDATE, inline: true})
                    return message.reply({ embeds: [embed] })
                }
            })
            .catch(function (error) {
                let embed = new EmbedBuilder()
                    .setColor('#ED4245')
                    .setAuthor({ name :`에러!` })
                    .addFields({name: "Error", value: error})
                    .setTimestamp()
                    .setFooter({ text: 'Developed by Wonny._.lee' })
                message.channel.send({ embeds: [embed] })
                console.log(error);
            });
    }
}