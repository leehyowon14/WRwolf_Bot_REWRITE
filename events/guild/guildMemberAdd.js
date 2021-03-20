const { BitField } = require("discord.js")
const moment = require('moment-timezone');
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