const { MessageEmbed } = require("discord.js");
module.exports = async (bot, emoji) => {
    const sysch = emoji.guild.systemChannel
    if (sysch) {
        let gif
        if (emoji.animated) gif = 'gif'
        if (emoji.animated == false) gif = 'image'
        let embed = new MessageEmbed()
        .setColor('#ED4245')
        .setTitle('Emoji Log')
        .addField('Log-Type', 'Emoji Deleted')
        .addField('Emoji Name:', emoji.name)
        .addField('Emoji Type:', gif)
        //.addField('Author:', emoji.author.tag)
        .addField('Emoji:', emoji.url)
        .setTimestamp()
        sysch.send({ embeds: [embed] })
    }
}