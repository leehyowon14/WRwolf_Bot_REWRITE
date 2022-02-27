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
        let response = await axios({
            method: 'get',
            url: `http://hangang.dkserver.wo.tc`,
        });
        if (response.status == 200) {
          const river = JSON.parse(response.data);
          let embed = new MessageEmbed()
          .setColor('#4fe8a3')
          .setTitle('한강 수온')
          .setDescription('')
          .addField(':droplet: ' + river.temp, '측정 시각: ' + river.time, true)
          message.channel.send({ embeds: [embed] })
      }
    }
}