const { EmbedBuilder } = require("discord.js");
module.exports = async (bot, ban) => {
    const sysch = ban.guild.systemChannel
    if (sysch) {
        let banReason = ban.reason
        if (banReason == null) banReason = 'No reason provided'
        let embed = new EmbedBuilder()
        .setColor('#ED4245')
        .setTitle('User Ban Log')
        .addFields(
            [
                {name: 'Log-Type', value: 'User Banned'},
                {name: 'User:', value: ban.user.tag},
                {name: 'Reason:', value: banReason}
            ]
        )
        .setTimestamp()
        sysch.send({ embeds: [embed] })
    }
}