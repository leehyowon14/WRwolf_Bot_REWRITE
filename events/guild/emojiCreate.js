const { EmbedBuilder } = require("discord.js");
module.exports = async (bot, emoji) => {
    const sysch = emoji.guild.systemChannel
    if (sysch) {
        let gif
        if (emoji.animated) gif = 'gif'
        if (emoji.animated == false) gif = 'image'
        let embed = new EmbedBuilder()
        .setColor('#57F287')
        .setTitle('Emoji Log')
        .addField('Log-Type', 'Emoji Create')
        .addField('Emoji Name:', emoji.name)
        .addField('Emoji Type:', gif)
        //.addField('Author:', emoji.author.tag)
        .addField('Emoji:', `:${emoji.name}:`)
        .setTimestamp()
        sysch.send({ embeds: [embed] })
    }
}