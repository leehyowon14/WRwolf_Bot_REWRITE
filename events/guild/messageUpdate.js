const { MessageEmbed } = require("discord.js");

module.exports = async (bot, oldMessage, newMessage) => {
    if(newMessage.author.bot) return;
    if (!newMessage.guild.systemChannel) {
    return;
    }
    if(oldMessage.content == newMessage.content) return;
    let img = oldMessage.author.avatar ? `https://cdn.discordapp.com/avatars/${oldMessage.author.id}/${oldMessage.author.avatar}.webp?size=256` : undefined;
    let embed = new MessageEmbed()
        .setTitle('Chatting Log')
        .setColor('#5865F2')
        .addField('Log-Type', 'Edited Message')
        .addField('Message By:', oldMessage.author.tag)
        .addField('Channel:', oldMessage.channel.name)
        .addField('Old Message:', oldMessage.content)
        .addField('New Message:', newMessage.content)
        .setFooter(oldMessage.author.tag, img)
        .setTimestamp()
        newMessage.guild.systemChannel.send({ embeds: [embed] })
}
