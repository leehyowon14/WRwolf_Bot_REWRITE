const { MessageEmbed } = require("discord.js");
module.exports = async (bot, ban) => {
    const sysch = ban.guild.systemChannel
    if (sysch) {
        let embed = new MessageEmbed()
        .setColor('#57F287')
        .setTitle('User Ban Log')
        .addField('Log-Type', 'User Banned')
        .addField('User:', ban.user.tag)
        .addField('Reason:', ban.reason)
        .setTimestamp()
        sysch.send({ embeds: [embed] })
    }
}