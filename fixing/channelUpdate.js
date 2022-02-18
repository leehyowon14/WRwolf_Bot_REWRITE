const { MessageEmbed } = require("discord.js");
module.exports = async (bot, oldChannel, newChannel) => {
    const sysch = oldChannel.guild.systemChannel
    if (sysch) {
        if (oldChannel.isText()) {
            if (oldChannel.name != newChannel.name) {
                let embed = new MessageEmbed()
                .setColor('#57F287')
                .setTitle('Channel Log')
                .addField('Log-Type', 'Channel Name Changed')
                .addField('Old Channel Name:', oldChannel.name)
                .addField('New Channel Name:', newChannel.name)
                .addField('Channel Type:', newChannel.type.toString())
                .setTimestamp()
                return sysch.send({ embeds: [embed] })
            }
            if (oldChannel.topic != newChannel.topic) {
                let embed = new MessageEmbed()
                .setColor('#57F287')
                .setTitle('Channel Log')
                .addField('Log-Type', 'Channel Topic Changed')
                .addField('Old Channel Topic:', oldChannel.topic)
                .addField('New Channel Topic:', newChannel.topic)
                .addField('Channel Type:', newChannel.type.toString())
                .setTimestamp()
                return sysch.send({ embeds: [embed] })
            }
            if (oldChannel.nsfw != newChannel.nsfw) {
                let embed = new MessageEmbed()
                .setColor('#57F287')
                .setTitle('Channel Log')
                .addField('Log-Type', 'Channel NSFW Changed')
                .addField('Old Channel NSFW:', oldchannel.nsfw.toString())
                .addField('New Channel NSFW:', newChannel.nsfw.toString())
                .addField('Channel Type:', newChannel.type.toString())
                .setTimestamp()
                return sysch.send({ embeds: [embed] })
            }
        } else if (oldChannel.isVoice()) {
            if (oldChannel.bitrate != newChannel.bitrate) {
                let embed = new MessageEmbed()
                .setColor('#57F287')
                .setTitle('Channel Log')
                .addField('Log-Type', 'Channel Bitrate Changed')
                .addField('Old Channel Name:', oldChannel.bitrate.toString())
                .addField('New Channel Name:', newChannel.bitrate.toString())
                .addField('Channel Type:', newChannel.type.toString())
                .setTimestamp()
                return sysch.send({ embeds: [embed] })
            }
            if (oldChannel.userLimit != newChannel.userLimit) {
                let embed = new MessageEmbed()
                .setColor('#57F287')
                .setTitle('Channel Log')
                .addField('Log-Type', 'Channel userLimit Changed')
                .addField('Old Channel Name:', oldChannel.userLimit.toString())
                .addField('New Channel Name:', newChannel.userLimit.toString())
                .addField('Channel Type:', newChannel.type.toString())
                .setTimestamp()
                return sysch.send({ embeds: [embed] })
            }
        }
    }
}