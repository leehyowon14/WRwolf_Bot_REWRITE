const { MessageAttachment } = require('discord.js');
const { MessageEmbed } = require("discord.js");
const dateFormat = require('dateformat')

module.exports = async (bot, messages) => {
    if (!messages.first().guild.systemChannel) {
    return;
    }
    let embed = new MessageEmbed()
        .setTitle('Chatting Log')
        .setColor('#5865F2')
        .addField('Log-Type', 'Deleted Message(Bulk)')
        //.addField('Message By:', message.author.tag)
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

        if([...messages.values()].length > 10) {
            const log_txt_file = new MessageAttachment(Buffer.from(Log, 'utf-8'), 'DeletedMessages.txt');
            messages.first().guild.systemChannel.send({ files : [log_txt_file] });
        } else {
            Log += "\n```"
            embed.addField("Messages", Log)
            messages.first().guild.systemChannel.send({ embeds: [embed] })
        }
}