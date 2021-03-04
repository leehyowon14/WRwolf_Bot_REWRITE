const { MessageEmbed } = require("discord.js");
module.exports = {
    config: {
        name: "invite",
        aliases: [`${prefix}invite`, `${prefix}초대코드`, `${prefix}초대링크`],
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
                .setFooter('Developed by sG.wolf#5070')
        message.channel.send(embed)
          });
    }

      if (args[0]) {
        return
      }
    }
    }