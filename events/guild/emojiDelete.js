const { EmbedBuilder } = require("discord.js");
module.exports = async (bot, emoji) => {
    const sysch = emoji.guild.systemChannel
    if (sysch) {
        let gif
        if (emoji.animated) gif = 'gif'
        if (emoji.animated == false) gif = 'image'
        let embed = new EmbedBuilder()
        .setColor('#ED4245')
        .setTitle('Emoji Log')
        .addFields(
            [
                {name: 'Log-Type', value: 'Emoji Deleted'},
                {name: 'Emoji Name:', value: emoji.name},
                {name: 'Emoji Type:', value: gif},
                {name: 'Emoji:', value: emoji.url}
            ]
        )
        .setTimestamp()
        sysch.send({ embeds: [embed] })
    }
}