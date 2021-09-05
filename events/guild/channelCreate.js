const { MessageEmbed } = require("discord.js");
module.exports = async (bot, channel) => {
    const sysch = channel.guild.systemChannel
    if (sysch) {
        let embed = new MessageEmbed()
        .setColor('#57F287')
        .setTitle('Channel Log')
        .addField('Log-Type', 'Channel Create')
        .addField('Channel Name:', channel.name)
        .addField('Channel Type:', channel.type.toString())
        .setTimestamp()
        sysch.send({ embeds: [embed] })
    }
}