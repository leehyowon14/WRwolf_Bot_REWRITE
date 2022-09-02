const { EmbedBuilder } = require("discord.js");
module.exports = async (bot, channel) => {
    const sysch = channel.guild.systemChannel
    if (sysch) {
        let embed = new EmbedBuilder()
        .setColor('#ED4245')
        .setTitle('Channel Log')
        .addFields(
            [
                {name: 'Log-Type', value: 'Channel Deleted'},
                {name: 'Channel Name', value: channel.name},
                {name: 'Channel Type', value: channel.type.toString()}

            ]
        )
        .setTimestamp()
        sysch.send({ embeds: [embed] })
    }
}