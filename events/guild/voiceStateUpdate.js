const { EmbedBuilder } = require("discord.js");

module.exports = async (bot, oldState, newState) => {
    const sysch = newState.guild.systemChannel
    if (sysch) {
        let embed = new EmbedBuilder()
            .setColor('#FFFFFF')
            .setTitle('Member Voice Status Log')
            .addFields(
                [
                    { name:'Log-Type', value: 'User Voice State Update'},
                ]
            )
            .setTimestamp()
        if (oldState.channel == null) {
            embed.addFields(
                [
                    { name: "Type", value: '입장' },
                    { name: "Channel", value: newState.channel.name}
                ]
            )
        } else if (newState.channel == null) {
            embed.addFields(
                [
                    { name: "Type", value: '퇴장' },
                    { name: "Channel", value: oldState.channel.name }
                ]
            )
        }
        
        sysch.send({ embeds: [embed] })
    }
}