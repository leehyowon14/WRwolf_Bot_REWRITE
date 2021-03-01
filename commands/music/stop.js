module.exports = {
    config: {
    name: "stop",
    aliases: [`${prefix}disconnect`, `${prefix}leave`],
    inVoiceChannel: true,
    },
    run: async (bot, message, args) => {
        const queue = bot.distube.getQueue(message)
        if (!queue) return message.channel.send(`${bot.emotes.error} | There is nothing in the queue right now!`)
        bot.distube.stop(message)
        message.channel.send(`${bot.emotes.success} | Stopped!`)
    }
}
