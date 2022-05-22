const { MessageEmbed, WebhookClient } = require("discord.js");
const protex = require('../../db/protection.js')

const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/946400164443197460/zQE06FdTCSAr9MWA1luGsapCZLGPPXaatvMvAkhYk2ec5iJzEv5q-sPZ0pUgsae2oOSo'})

module.exports = async (bot, oldMessage, newMessage) => {
    if(newMessage.author.bot) return;
    if (!newMessage.guild.systemChannel) {
    return;
    }

    let isUserUseProtection
    let user = await protex.findOne({user_id: newMessage.author.id})
    if (!user) {
        isUserUseProtection = false
    } else {
        isUserUseProtection = user.is_Activated 
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
        .setFooter({ text:oldMessage.author.tag, iconURL: img })
        .setTimestamp()
    if (isUserUseProtection) {
        return webhookClient.send({
            embeds: [embed]
        });
    }
    newMessage.guild.systemChannel.send({ embeds: [embed] })
}
