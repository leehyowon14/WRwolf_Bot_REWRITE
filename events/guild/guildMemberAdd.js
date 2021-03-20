const { MessageEmbed } = require("discord.js");
module.exports = async (bot, member) => {
    if (sysch) {
        let embed = new MessageEmbed()
        .setColor('#f94343')
        .setTitle('')
        .addField('Log-Type', 'new User')
        .addField('user:', member.user)
        .setTimestamp()
        sysch.send(embed)
    }
}