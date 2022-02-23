const { MessageEmbed } = require("discord.js");
module.exports = async (bot, thread) => {
    const sysch = thread.guild.systemChannel
    if (sysch) {
        let embed = new MessageEmbed()
        .setColor('#FFFFFF')
        .setTitle('Thread Log')
        .addField('Log-Type', 'Thread Deleted')
        .addField('name:', thread.name)
        .addField('creater:', bot.users.cache.get(thread.ownerId).tag)
        .setTimestamp()
        sysch.send({ embeds: [embed] })
    }
}