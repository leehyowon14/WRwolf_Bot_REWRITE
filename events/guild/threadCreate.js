const { MessageEmbed } = require("discord.js");
module.exports = async (bot, thread) => {
    thread.join()
    const sysch = thread.guild.systemChannel
    if (sysch) {
        let embed = new MessageEmbed()
        .setColor('#FFFFFF')
        .setTitle('Thread Log')
        .addField('Log-Type', 'new Thread')
        .addField('name:', thread.name)
        .addField('creater:', bot.users.cache.get(thread.ownerId).tag)
        .setTimestamp()
        sysch.send({ embeds: [embed] })
    }
}