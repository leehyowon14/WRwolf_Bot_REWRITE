const { MessageEmbed } = require("discord.js");
module.exports = async (bot, oldEmoji, newEmoji) => {
    const sysch = oldEmoji.guild.systemChannel
    if (sysch) {
        let embed = new MessageEmbed()
        .setColor('#57F287')
        .setTitle('Emoji Log')
        .addField('Log-Type', 'Emoji Name Changed')
        .addField('Old Emoji Name:', oldEmoji.name)
        .addField('New Emoji Name:', newEmoji.name)
        .addField('Emoji:', `:${emoji.name}:`)
        .setTimestamp()
        sysch.send({ embeds: [embed] })
    }
}