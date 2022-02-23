const { MessageEmbed } = require("discord.js");
module.exports = async (bot, oldChannel, newChannel) => {
    const sysch = oldChannel.guild.systemChannel
    if (sysch) {
        if (oldChannel.name != newChannel.name) {
            let embed = new MessageEmbed()
                .setColor('#57F287')
                .setTitle('Channel Log')
                .addField('Log-Type', 'Channel Name Changed')
                .addField('Old Channel Name:', oldChannel.name)
                .addField('New Channel Name:', newChannel.name)
                .addField('Channel Type:', newChannel.type.toString())
                .setTimestamp()
            sysch.send({ embeds: [embed] })
        }
        if (oldChannel.isText()) {
            if (oldChannel.topic != newChannel.topic) {
                let oldTopic = oldChannel.topic;
                let newTopic = newChannel.topic;
                if (oldTopic == null) oldTopic = 'None';
                if (newTopic == null) newTopic = 'None';
                
                let embed = new MessageEmbed()
                    .setColor('#57F287')
                    .setTitle('Channel Log')
                    .addField('Log-Type', 'Channel Topic Changed')
                    .addField('Old Channel Topic:', oldTopic)
                    .addField('New Channel Topic:', newTopic)
                    .addField('Channel Type:', newChannel.type.toString())
                    .setTimestamp()
                sysch.send({ embeds: [embed] })
            }
            if (oldChannel.nsfw != newChannel.nsfw) {
                let embed = new MessageEmbed()
                    .setColor('#57F287')
                    .setTitle('Channel Log')
                    .addField('Log-Type', 'Channel NSFW Changed')
                    .addField('Old Channel NSFW:', oldChannel.nsfw.toString())
                    .addField('New Channel NSFW:', newChannel.nsfw.toString())
                    .addField('Channel Type:', newChannel.type.toString())
                    .setTimestamp()
                sysch.send({ embeds: [embed] })
            }
        } else if (oldChannel.isVoice()) {
            if (oldChannel.bitrate != newChannel.bitrate) {
                let embed = new MessageEmbed()
                    .setColor('#57F287')
                    .setTitle('Channel Log')
                    .addField('Log-Type', 'Channel Bitrate Changed')
                    .addField('Old Channel Bitrate:', oldChannel.bitrate.toString())
                    .addField('New Channel Bitrate:', newChannel.bitrate.toString())
                    .addField('Channel Type:', newChannel.type.toString())
                    .setTimestamp()
                sysch.send({ embeds: [embed] })
            }
            if (oldChannel.userLimit != newChannel.userLimit) {
                let olduserLimit = oldChannel.userLimit.toString()
                let newuserLimit = newChannel.userLimit.toString()
                if (oldChannel.userLimit == 0) {
                    olduserLimit = 'Infinite'
                }
                if (newChannel.userLimit == 0) {
                    newuserLimit = 'Infinite'
                }
                let embed = new MessageEmbed()
                    .setColor('#57F287')
                    .setTitle('Channel Log')
                    .addField('Log-Type', 'Channel userLimit Changed')
                    .addField('Old Channel UserLimit:', olduserLimit)
                    .addField('New Channel UserLimit:', newuserLimit)
                    .addField('Channel Type:', newChannel.type.toString())
                    .setTimestamp()
                sysch.send({ embeds: [embed] })
            }
        }
    }
}