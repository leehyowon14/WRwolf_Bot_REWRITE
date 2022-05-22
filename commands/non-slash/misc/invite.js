const { MessageEmbed } = require("discord.js");
module.exports = {
    config: {
        name: `invite`,
        aliases: [`${prefix}초대코드`, `${prefix}초대링크`, `${prefix}invite`],
        description: "",
        usage: "",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
      if (!args[0]) {
        message.guild.channels.cache
        .get(message.channel.id)
        .createInvite({ maxAge: 0 })
          .then(invite => {
            let embed = new MessageEmbed()
                .setColor('#186de6')
                .addField(`초대링크`, invite.url)
                .setTimestamp()
                .setFooter({ text: 'Developed by sG.wolf#5732' })
        message.channel.send({ embeds: [embed] })
          });
    }

      if (args[0]) {
        return
      }
    }
    }