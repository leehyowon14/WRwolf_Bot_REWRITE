const { EmbedBuilder, WebhookClient } = require("discord.js");
const protex = require('../../db/protection.js')
const protex_channel = require('../../db/protection_channel.js')

const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/946400164443197460/zQE06FdTCSAr9MWA1luGsapCZLGPPXaatvMvAkhYk2ec5iJzEv5q-sPZ0pUgsae2oOSo'})

module.exports = async (bot, message) => {
    if(message.author.bot) return;

    if (!message.guild.systemChannel) {
        return;
    }

    let isUserUseProtection, isChannelUseProtection
    let user = await protex.findOne({user_id: message.author.id})
    if (!user) {
        isUserUseProtection = false
    } else {
        isUserUseProtection = user.is_Activated 
    }

    let channel = await protex_channel.findOne({ channel_id: message.channelId })
    if (!channel) {
        isChannelUseProtection = false
    } else {
        isChannelUseProtection = channel.is_Activated
    }

    // await message.guild.fetchAuditLogs().then(audit => {
    //     del_u = audit.entries.first().executor.tag
    // })

    let embed

    if([...message.attachments.values()].length > 0) {
        try {
            if(message.content.length == 0) {
                let img = message.author.avatar ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=256` : undefined;
                embed = new EmbedBuilder()
                    .setTitle('Chatting Log')
                    .setColor('#5865F2')
                    .addFields(
                        [
                            {name: 'Log-Type', value: 'Deleted Message'},
                            {name: 'Message By:', value: message.author.tag},
                            //{name: 'Deleated By:', value: del_u}
                            {name: 'Channel:', value: message.channel.name}
                        ]
                    )
                    .setFooter({ text: message.author.tag, iconURL: img })
                    .setTimestamp()

            } else {
                let content = message.content
                if (!message.content) {
                    content = "undefined (It can be in embed format.)"
                } else if (message.content.length > 1000) {
                    content = "message is too long!(over then 1000 letter)"
                }
                let img = message.author.avatar ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=256` : undefined;
                embed = new EmbedBuilder()
                    .setTitle('Chatting Log')
                    .setColor('#5865F2')
                    .addFields(
                        [
                            {name: 'Log-Type', value: 'Deleted Message'},
                            {name: 'Message By:', value: message.author.tag},
                            //{name: 'Deleated By:', value: del_u}
                            {name: 'Channel:', value: message.channel.name},
                            {name: 'Message:', value: content}
                        ]
                    )
                    .setFooter({ text: message.author.tag, iconURL: img })
                    .setTimestamp()
            }
        } catch (e) {
            console.log(e);
            return message.guild.SystemChannel.send({content: `An error occurred: **${e.message}**` });
        }
    } else {
        let content = message.content
        if (!message.content) {
            content = "undefined (It can be in embed format.)"
        } else if (message.content.length > 1000) {
            content = "message is too long!(over then 1000 letter)"
        }
        let img = message.author.avatar ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=256` : undefined;
        embed = new EmbedBuilder()
            .setTitle('Chatting Log')
            .setColor('#5865F2')
            .addFields(
                [
                    {name: 'Log-Type', value: 'Deleted Message'},
                    {name: 'Message By:', value: message.author.tag},
                    //{name: 'Deleated By:', value: del_u}
                    {name: 'Channel:', value: message.channel.name},
                    {name: 'Message:', value: content}
                ]
            )
            .setFooter({ text: message.author.tag, iconURL: img })
            .setTimestamp()
    }
    if (isUserUseProtection) {
        webhookClient.send({
            embeds: [embed]
        });
        if([...message.attachments.values()].length > 0) {
            for (let i = 0; i<[...message.attachments.values()].length; i++) {
                webhookClient.send({ content : [...message.attachments.values()][i].url });
            }
        }
        return;
    }

    if (isChannelUseProtection) {
        return
    }

    message.guild.systemChannel.send({ embeds: [embed] })
 
    if([...message.attachments.values()].length > 0) {
        for (let i = 0; i<[...message.attachments.values()].length; i++) {
            message.guild.systemChannel.send({ content : [...message.attachments.values()][i].url });
        }
    }
}