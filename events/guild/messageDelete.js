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
                let content = message.content
                if (!message.content) {
                    content = "undefined (It can be in embed format.)"
                }
                let img = message.author.avatar ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=256` : undefined;
                let embed = new MessageEmbed()
                    .setTitle('Chatting Log')
                    .setColor('#5865F2')
                    .addField('Log-Type', 'Deleted Message')
                    .addField('Message By:', message.author.tag)
                    .addField('Channel:', message.channel.name)
                    .addField('Message:', content)
                    .setFooter(message.author.tag, img)
                    .setTimestamp()
                
                    message.guild.systemChannel.send({ embeds: [embed] })
            }
            for (let i = 0; i<[...message.attachments.values()].length; i++) {
                message.guild.systemChannel.send({ content : [...message.attachments.values()][i].url });
              }
            return;
        } catch (e) {
            console.log(e);
            return message.guild.SystemChannel.send({content: `An error occurred: **${e.message}**` });
        }
    }
    let content = message.content
    if (!message.content) {
        content = "undefined (It can be in embed format.)"
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