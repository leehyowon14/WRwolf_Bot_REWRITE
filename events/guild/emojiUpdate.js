const { EmbedBuilder } = require("discord.js");
module.exports = async (bot, oldEmoji, newEmoji) => {
    const sysch = oldEmoji.guild.systemChannel
    if (sysch) {
        let embed = new EmbedBuilder()
        .setColor('#57F287')
        .setTitle('Emoji Log')
        .addFields(
            [
                {name: 'Log-Type', value: 'Emoji Name Changed'},
                {name: 'Old Emoji Name:', value: oldEmoji.name},
                {name: 'New Emoji Name:', value: newEmoji.name},
                {name: 'Emoji:', value: `:${emoji.name}:`}
            ]
        )
        .setTimestamp()
        sysch.send({ embeds: [embed] })
    }
}