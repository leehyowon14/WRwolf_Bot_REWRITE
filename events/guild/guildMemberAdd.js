const { MessageEmbed } = require("discord.js");
module.exports = async (bot, member) => {
    const sysch = member.guild.systemChannel
    if (sysch) {
        let embed = new MessageEmbed()
        .setColor('#57F287')
        .setTitle('')
        .addField('Log-Type', 'new User')
        .addField('user:', member.user.toString())
        .setTimestamp()
        sysch.send({ embeds: [embed] })
    }
}