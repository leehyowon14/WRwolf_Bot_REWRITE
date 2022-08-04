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
        axios.get(`http://hangang.dkserver.wo.tc`)
            .then(function (response) {
                if (response.status == 200) {
                    let river = response.data
                    let embed = new EmbedBuilder()
                        .setColor('#4fe8a3')
                        .setTitle('한강 수온')
                        .addFields({name: ':droplet: ' + river.temp, value: '측정 시각: ' + river.time, inline: true})
                    return message.reply({ embeds: [embed] })
                }
            })
            .catch(function (error) {
                let embed = new EmbedBuilder()
                    .setColor('#ED4245')
                    .setAuthor({ name :`에러!` })
                    .addFields({name: "Error", value: error})
                    .setTimestamp()
                    .setFooter({ text: 'Developed by sG.wolf' })
                message.channel.send({ embeds: [embed] })
                console.log(error);
            });
    }
}