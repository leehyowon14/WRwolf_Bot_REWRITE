const { MessageEmbed } = require("discord.js");
module.exports = async (bot, ban) => {
    const sysch = ban.guild.systemChannel
    if (sysch) {
        let banReason = ban.reason
        if (banReason == null) banReason = 'No reason provided'
        let embed = new MessageEmbed()
        .setColor('#57F287')
        .setTitle('User Unban Log')
        .addField('Log-Type', 'User Unbanned')
        .addField('User:', ban.user.tag)
        .addField('Reason:', banReason)
        .setTimestamp()
        sysch.send({ embeds: [embed] })
    }
}