const { EmbedBuilder } = require("discord.js");
module.exports = async (bot, channel) => {
    const sysch = channel.guild.systemChannel
    if (sysch) {
        let embed = new EmbedBuilder()
        .setColor('#ED4245')
        .setTitle('Channel Log')
        .addField('Log-Type', 'Channel Deleted')
        .addField('Channel Name:', channel.name)
        .addField('Channel Type:', channel.type.toString())
        .setTimestamp()
        sysch.send({ embeds: [embed] })
    }
}