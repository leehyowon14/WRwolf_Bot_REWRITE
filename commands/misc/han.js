const request = require("request")
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
        request('http://hangang.dkserver.wo.tc', (error, response, html) => {
      if (!error && response.statusCode == 200) {
          const river = JSON.parse(html);
          let embed = new MessageEmbed()
          .setColor('#4fe8a3')
          .setTitle('한강 수온')
          .setDescription('')
          .addField(':droplet: ' + river.temp, '측정 시각: ' + river.time, true)
          message.channel.send(embed)
      }
  });
    }
}