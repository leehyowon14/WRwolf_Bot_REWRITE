const { MessageEmbed } = require("discord.js");

module.exports = async (bot, oldMessage, newMessage, message) => {
    if(newMessage.author.bot) return;
    if (!message.guild.systemChannel) {
        let embed = new MessageEmbed()
        .setColor('#f94343')
        .setAuthor('에러!')
        .setTitle('시스템채널을 설정해주세요!')
        .setDescription('서버설정-일반-시스템 메세지 채널')
        .setTimestamp()
        .setFooter('Developed by sG.wolf#5070')
    message.channel.send(embed)
    return;
    }
    if(oldMessage.content == newMessage.content) return;
    let img = oldMessage.author.avatar ? `https://cdn.discordapp.com/avatars/${oldMessage.author.id}/${oldMessage.author.avatar}.webp?size=256` : undefined;
    let embed = new MessageEmbed()
        .setTitle('Chatting Log')
        .setColor('#FFFF')
        .addField('Log-Type', 'Edited Message')
        .addField('Message By:', oldMessage.author.tag)
        .addField('Channel:', oldMessage.channel.name)
        .addField('Old Message:', oldMessage.content)
        .addField('New Message:', newMessage.content)
        .setFooter(oldMessage.author.tag, img)
        .setTimestamp()
        message.guild.systemChannel.send(embed)
}
