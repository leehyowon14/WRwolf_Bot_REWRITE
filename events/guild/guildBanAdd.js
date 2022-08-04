const { EmbedBuilder } = require("discord.js");
module.exports = async (bot, ban) => {
    const sysch = ban.guild.systemChannel
    if (sysch) {
        let banReason = ban.reason
        if (banReason == null) banReason = 'No reason provided'
        let embed = new EmbedBuilder()
        .setColor('#ED4245')
        .setTitle('User Ban Log')
        .addField('Log-Type', 'User Banned')
        .addField('User:', ban.user.tag)
        .addField('Reason:', banReason)
        .setTimestamp()
        sysch.send({ embeds: [embed] })
    }
}