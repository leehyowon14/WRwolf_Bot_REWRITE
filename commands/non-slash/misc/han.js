const axios = require('axios');
const { MessageEmbed } = require("discord.js");
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
                    let river = JSON.parse(response.data);
                    let embed = new MessageEmbed()
                        .setColor('#4fe8a3')
                        .setTitle('한강 수온')
                        .addField(':droplet: ' + river.temp, '측정 시각: ' + river.time, true)
                    return message.reply({ embeds: [embed] })
                }
            })
            .catch(function (error) {
                let embed = new MessageEmbed()
                    .setColor('#ED4245')
                    .setAuthor({ name :`에러!` })
                    .addField("Error", error)
                    .setTimestamp()
                    .setFooter({ text: 'Developed by sG.wolf' })
                message.channel.send({ embeds: [embed] })
                console.log(error);
            });
    }
}