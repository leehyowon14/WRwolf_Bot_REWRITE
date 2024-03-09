const { EmbedBuilder, WebhookClient } = require("discord.js");
const protex = require('../../db/protection.js')
const protex_channel = require('../../db/protection_channel.js')

const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/946400164443197460/zQE06FdTCSAr9MWA1luGsapCZLGPPXaatvMvAkhYk2ec5iJzEv5q-sPZ0pUgsae2oOSo'})

module.exports = async (bot, oldMessage, newMessage) => {
    if(newMessage.author.bot) return;
    if (!newMessage.guild.systemChannel) {
    return;
    }

    let isUserUseProtection, isChannelUseProtection
    let user = await protex.findOne({user_id: newMessage.author.id})
    if (!user) {
        isUserUseProtection = false
    } else {
        isUserUseProtection = user.is_Activated 
    }

    let channel = await protex_channel.findOne({channel_id: newMessage.channel_id})
    if (!channel) {
        isChannelUseProtection = false
    } else {
        isChannelUseProtection = channel.is_Activated
    }

    if(oldMessage.content == newMessage.content) return;
    let img = oldMessage.author.avatar ? `https://cdn.discordapp.com/avatars/${oldMessage.author.id}/${oldMessage.author.avatar}.webp?size=256` : undefined;
    let embed = new EmbedBuilder()
        .setTitle('Chatting Log')
        .setColor('#5865F2')
        .addFields(
            [
                {name: 'Log-Type', value: 'Edited Message'},
                {name: 'Message By:', value: oldMessage.author.tag},
                {name: 'Channel:', value: oldMessage.channel.name},
                {name: 'Old Message:', value: oldMessage.content},
                {name: 'New Message:', value: newMessage.content}
            ]
        )
        .setFooter({ text:oldMessage.author.tag, iconURL: img })
        .setTimestamp()
    if (isUserUseProtection) {
        return webhookClient.send({
            embeds: [embed]
        });
    }

    if (isChannelUseProtection) {
        return
    }
    
    newMessage.guild.systemChannel.send({ embeds: [embed] })
}
