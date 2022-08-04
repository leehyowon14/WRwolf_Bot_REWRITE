const { EmbedBuilder } = require("discord.js");
module.exports = async (bot, member) => {
    const sysch = member.guild.systemChannel
    let user
    if (sysch) {
        if (!member) {
            user = "Unknown"
        } else {
            user = member.user.tag
        }
    let embed = new EmbedBuilder()
    .setColor('#ED4245')
    .setTitle('User Log')
    .addField('Log-Type', 'User leaves')
    .addField('user:', user)
    .setTimestamp()
    sysch.send({ embeds: [embed] })
    }
    let muterole = member.guild.roles.cache.find(r => r.name == "Muted");
    if (!muterole) return;
    let isMuted = member._roles.find(x => x == muterole.id);
    if(isMuted) {
        member.ban({ deleteMessageDays: 0, reason: '뮤트상태에서 서버 퇴장' }).catch(err => console.log(err))
        if(sysch) {
            let embed = new EmbedBuilder()
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