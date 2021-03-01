module.exports = {
    config: {
    name: "skip",
    aliases: [`${prefix}s`, `${prefix}skip`],
    inVoiceChannel: true,
    },
    run: async (bot, message, args) => {
        const queue = bot.distube.getQueue(message)
        if (!queue) return message.channel.send(`${bot.emotes.error} | There is nothing in the queue right now!`)
        try {
            bot.distube.skip(message)
            message.channel.send(`${bot.emotes.success} | Skipped! Now playing:\n${queue.songs[0].name}`)
        } catch (e) {
            message.channel.send(`${bot.emotes.error} | ${e}`)
        }
    }
}
