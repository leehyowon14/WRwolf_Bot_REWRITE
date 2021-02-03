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
        message.guild.channels.cache
        .get(message.channel.id)
        .createInvite({ maxAge: 0 })
          .then(invite => {
            let embed = new MessageEmbed()
                .setColor('#186de6')
                .addField(`초대링크`, invite.url)
                .setTimestamp()
                .setFooter('Developed by 느윽대')
        message.channel.send(embed)
          });
    }
}