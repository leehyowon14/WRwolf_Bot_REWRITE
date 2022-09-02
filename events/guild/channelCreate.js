const { EmbedBuilder } = require("discord.js");
module.exports = async (bot, channel) => {
    const sysch = channel.guild.systemChannel
    if (sysch) {
        let embed = new EmbedBuilder()
        .setColor('#57F287')
        .setTitle('Channel Log')
        .addFields(
            [
                {name: 'Log-Type', value: 'Channel Create'},
                {name: 'Channel Name', value: channel.name},
                {name: 'Channel Type', value: channel.type.toString()}

            ]
        )
        .setTimestamp()
        sysch.send({ embeds: [embed] })
    }
}