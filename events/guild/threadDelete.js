const { EmbedBuilder } = require("discord.js");
module.exports = async (bot, thread) => {
    const sysch = thread.guild.systemChannel
    if (sysch) {
        let embed = new EmbedBuilder()
        .setColor('#FFFFFF')
        .setTitle('Thread Log')
        .addFields(
            [
                { name:'Log-Type', value: 'Thread Deleted'},
                { name: 'name:', value: thread.name},
                { name: 'creater:', value: bot.users.cache.get(thread.ownerId).tag},
            ]
        )
        .setTimestamp()
        sysch.send({ embeds: [embed] })
    }
}