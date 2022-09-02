const { EmbedBuilder } = require("discord.js");
module.exports = async (bot, member) => {
    const sysch = member.guild.systemChannel
    if (sysch) {
        let embed = new EmbedBuilder()
        .setColor('#57F287')
        .setTitle('User Log')
        .addFields(
            [
                {name: 'Log-Type', value: 'new User'},
                {name: 'user:', value: member.user.toString()}
            ]
        )
        .setTimestamp()
        sysch.send({ embeds: [embed] })
    }
}