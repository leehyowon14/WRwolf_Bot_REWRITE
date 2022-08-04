const { AttachmentBuilder } = require('discord.js');
const { EmbedBuilder, WebhookClient } = require("discord.js");
const dateFormat = require('dateformat')
const protex = require('../../db/protection.js')

const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/946400164443197460/zQE06FdTCSAr9MWA1luGsapCZLGPPXaatvMvAkhYk2ec5iJzEv5q-sPZ0pUgsae2oOSo'})

module.exports = async (bot, messages) => {

    let isUserUseProtection
    let user = await protex.findOne({user_id: messages.first().author.id})
    if (!user) {
        isUserUseProtection = false
    } else {
        isUserUseProtection = user.is_Activated 
    }

    if (!messages.first().guild.systemChannel) {
        return;
    }

    let embed = new EmbedBuilder()
        .setTitle('Chatting Log')
        .setColor('#5865F2')
        .addField('Log-Type', 'Deleted Message(Bulk)')
        .addField('Channel:', messages.first().channel.name)
        //.setFooter(message.author.tag)
        .setTimestamp()
        if([...messages.values()].length > 10) {
            messages.first().guild.systemChannel.send({ embeds: [embed] })
        }
        let Log = "```";
        if([...messages.values()].length > 10) {
            Log = `Deleted Messages`;
        }
        for (const message of [...messages.values()].reverse()) {
            Log += `\r\n\r\n[${dateFormat(message.createdAt, 'yyyy/mm/dd ddd HH:MM:ss')}] ${message.author?.tag ?? 'Unknown'} `;
            if([...message.attachments.values()].length > 0) {
                if(message.content.length == 0) {
                    for (let i = 0; i<[...message.attachments.values()].length; i++) {
                        Log += '\r\n[attachment] :' + [...message.attachments.values()][i].url;
                    }
                } else {
                    Log += ' : ' + message.content;
                    for (let i = 0; i<[...message.attachments.values()].length; i++) {
                        Log += '\r\n[attachment] :' + [...message.attachments.values()][i].url;
                    }
                }
            }
            Log += ' : ' + message.content;
        }

        if (isUserUseProtection) {
            if([...messages.values()].length > 10) {
                const log_txt_file = new AttachmentBuilder(Buffer.from(Log, 'utf-8'), 'DeletedMessages.txt');
                webhookClient.send({ files : [log_txt_file] });
            } else {
                Log += "\n```"
                embed.addFields([{name:"Messages", value:Log}])
                webhookClient.send({ embeds: [embed] })
            }
            return
        }

        if([...messages.values()].length > 10) {
            const log_txt_file = new AttachmentBuilder(Buffer.from(Log, 'utf-8'), 'DeletedMessages.txt');
            messages.first().guild.systemChannel.send({ files : [log_txt_file] });
        } else {
            Log += "\n```"
            embed.addFields([{name:"Messages", value:Log}])
            messages.first().guild.systemChannel.send({ embeds: [embed] })
        }
}