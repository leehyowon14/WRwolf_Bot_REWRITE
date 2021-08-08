const { MessageEmbed } = require("discord.js");
module.exports = async (bot, member, message) => {
    const sysch = member.guild.systemChannel
    const guild = member.guild
    if (sysch) {
    let embed = new MessageEmbed()
    .setColor('#ED4245')
    .setTitle('User Log')
    .addField('Log-Type', 'User leaves')
    .addField('user:', member.user.tag)
    .setTimestamp()
    sysch.send({ embeds: [embed] })
    }
    let muterole = member.guild.roles.cache.find(r => r.name == "Muted");
    let isMuted = member._roles.find(x => x == muterole.id);
    if(isMuted) {
        member.ban({ days: 0, reason: '뮤트상태에서 서버 퇴장' }).catch(err => console.log(err))
        if(sysch) {
            let embed = new MessageEmbed()
            .setColor('#ED4245')
            .setTitle('')
            .addField('Log-Type', 'banned user')
            .addField('user:', member.user.tag)
            .addField('reason:', '뮤트상태에서 서버 퇴장')
            .setTimestamp()
            sysch.send({ embeds: [embed] })
        }
    }
}