const { EmbedBuilder } = require("discord.js");
module.exports = async (bot, oldChannel, newChannel) => {
    const sysch = oldChannel.guild.systemChannel
    if (sysch) {
        if (oldChannel.name != newChannel.name) {
            let embed = new EmbedBuilder()
                .setColor('#57F287')
                .setTitle('Channel Log')
                .addFields(
                    [
                        {name: 'Log-Type', value: 'Channel Name Changed'},
                        {name: 'Old Channel Name:', value: oldChannel.name},
                        {name: 'New Channel Name:', value: newChannel.name},
                        {name: 'Channel Type:', value: newChannel.type.toString()},
                    ]
                )
                .setTimestamp()
            sysch.send({ embeds: [embed] })
        }
        if (oldChannel.type === ChannelType.GuildText) {
            if (oldChannel.topic != newChannel.topic) {
                let oldTopic = oldChannel.topic;
                let newTopic = newChannel.topic;
                if (oldTopic == null) oldTopic = 'None';
                if (newTopic == null) newTopic = 'None';
                
                let embed = new EmbedBuilder()
                    .setColor('#57F287')
                    .setTitle('Channel Log')
                    .addFields(
                        [
                            {name: 'Log-Type', value: 'Channel Topic Changed'},
                            {name: 'Old Channel Topic:', value: oldTopic},
                            {name: 'New Channel Topic:', value: newTopic},
                            {name: 'Channel Type:', value: newChannel.type.toString()},
                        ]
                    )
                    .setTimestamp()
                sysch.send({ embeds: [embed] })
            }
            if (oldChannel.nsfw != newChannel.nsfw) {
                let embed = new EmbedBuilder()
                    .setColor('#57F287')
                    .setTitle('Channel Log')
                    .addFields(
                        [
                            {name: 'Log-Type', value: 'Channel NSFW Changed'},
                            {name: 'Old Channel NSFW:', value: oldChannel.nsfw.toString()},
                            {name: 'New Channel NSFW:', value: newChannel.nsfw.toString()},
                            {name: 'Channel Type:', value: newChannel.type.toString()},
                        ]
                    )
                    .setTimestamp()
                sysch.send({ embeds: [embed] })
            }
        } else if (oldChannel.type === ChannelType.GuildVoice) {
            if (oldChannel.bitrate != newChannel.bitrate) {
                let embed = new EmbedBuilder()
                    .setColor('#57F287')
                    .setTitle('Channel Log')
                    .addFields(
                        [
                            {name: 'Log-Type', value: 'Channel Bitrate Changed'},
                            {name: 'Old Channel Bitrate:', value: oldChannel.bitrate.toString()},
                            {name: 'New Channel Bitrate:', value: newChannel.bitrate.toString()},
                            {name: 'Channel Type:', value: newChannel.type.toString()},
                        ]
                    )
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
                let embed = new EmbedBuilder()
                    .setColor('#57F287')
                    .setTitle('Channel Log')
                    .addFields(
                        [
                            {name: 'Log-Type', value: 'Channel userLimit Changed'},
                            {name: 'Old Channel userLimit:', value: olduserLimit},
                            {name: 'New Channel userLimit:', value: newuserLimit},
                            {name: 'Channel Type:', value: newChannel.type.toString()},
                        ]
                    )
                    .setTimestamp()
                sysch.send({ embeds: [embed] })
            }
        }
    }
}