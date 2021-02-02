const webhook = new WebhookClient(process.env.webhookid, process.env.webhooktoken);
const { MessageAttachment } = require('discord.js');
const { WebhookClient } = require('discord.js');
const fetch = require('node-fetch');
const { MessageEmbed } = require("discord.js");

module.exports = async (bot, message) => {
    if(message.author.bot) return;
    if(message.attachments.array().length > 0) {
        try {
            const result = await fetch(message.attachments.array()[0].proxyURL);
            if (!result.ok) throw new Error('Failed to get the avatar!');
            const avatar = await result.buffer();

            const attachment = new MessageAttachment(avatar, message.attachments.array()[0].name);
            if(message.content.length == 0) {
                let img = message.author.avatar ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=256` : undefined;
                let embed = new MessageEmbed()
                .setTitle('')
                .setColor('#FFFF')
                .addField('Log-Type', 'Deleted Message')
                .addField('Message By:', message.author.tag)
                .addField('Channel:', message.channel.name)
                .setFooter(message.author.tag, img)
                .setTimestamp()
                
                webhook.send(embed)
            } else {
                let img = message.author.avatar ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=256` : undefined;
                let embed = new MessageEmbed()
                    .setTitle('')
                    .setColor('#FFFF')
                    .addField('Log-Type', 'Deleted Message')
                    .addField('Message By:', message.author.tag)
                    .addField('Channel:', message.channel.name)
                    .addField('Message:', message.content)
                    .setFooter(message.author.tag, img)
                    .setTimestamp()
                
                webhook.send(embed)
            }
            return message.channel.send(attachment);
        } catch (e) {
            console.log(e);
            return message.channel.send(`An error occurred: **${e.message}**`);
        }
    }
    let img = message.author.avatar ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=256` : undefined;
    let embed = new MessageEmbed()
        .setTitle('')
        .setColor('#FFFF')
        .addField('Log-Type', 'Deleted Message')
        .addField('Message By:', message.author.tag)
        .addField('Channel:', message.channel.name)
        .addField('Message:', message.content)
        .setFooter(message.author.tag, img)
        .setTimestamp()
    
    webhook.send(embed)
}