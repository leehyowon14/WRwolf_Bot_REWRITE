const { MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');
const { MessageEmbed } = require("discord.js");

module.exports = async (bot, message) => {
    if(message.author.bot) return;

    if (!message.guild.systemChannel) {
    return;
    }
    if([...message.attachments.values()].length > 0) {
        try {
            const result = await fetch([...message.attachments.values()][0].proxyURL);
            if (!result.ok) throw new Error('Failed to get the avatar!');
            const avatar = await result.buffer();

            const attachment = new MessageAttachment(avatar, [...message.attachments.values()][0].name);
            if(message.content.length == 0) {
                let img = message.author.avatar ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=256` : undefined;
                let embed = new MessageEmbed()
                    .setTitle('Chatting Log')
                    .setColor('#5865F2')
                    .addField('Log-Type', 'Deleted Message')
                    .addField('Message By:', message.author.tag)
                    .addField('Channel:', message.channel.name)
                    .setFooter(message.author.tag, img)
                    .setTimestamp()
                    message.guild.systemChannel.send({ embeds: [embed] })

            } else {
                let img = message.author.avatar ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=256` : undefined;
                let embed = new MessageEmbed()
                    .setTitle('Chatting Log')
                    .setColor('#5865F2')
                    .addField('Log-Type', 'Deleted Message')
                    .addField('Message By:', message.author.tag)
                    .addField('Channel:', message.channel.name)
                    .addField('Message:', message.content)
                    .setFooter(message.author.tag, img)
                    .setTimestamp()
                
                    message.guild.systemChannel.send({ embeds: [embed] })
            }
            return message.guild.systemChannel.send({ files : [attachment] });
        } catch (e) {
            console.log(e);
            return message.guild.SystemChannel.send(`An error occurred: **${e.message}**`);
        }
    }
    let img = message.author.avatar ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=256` : undefined;
    let embed = new MessageEmbed()
        .setTitle('Chatting Log')
        .setColor('#5865F2')
        .addField('Log-Type', 'Deleted Message')
        .addField('Message By:', message.author.tag)
        .addField('Channel:', message.channel.name)
        .addField('Message:', message.content)
        .setFooter(message.author.tag, img)
        .setTimestamp()
    
        message.guild.systemChannel.send({ embeds: [embed] })
}