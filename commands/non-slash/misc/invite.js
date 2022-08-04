const { EmbedBuilder } = require("discord.js");
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
            let embed = new EmbedBuilder()
                .setColor('#186de6')
                .addFields({name: `초대링크`, value: invite.url})
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