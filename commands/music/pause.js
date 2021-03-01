module.exports = {
    config: {
    name: "pause",
    aliases: ["pause", "hold"],
    inVoiceChannel: true,
    },
    run: async (bot, message, args) => {
        const queue = bot.distube.getQueue(message)
        if (!queue) return message.channel.send(`${bot.emotes.error} | There is nothing in the queue right now!`)
        if (queue.pause) {
            bot.distube.resume(message)
            return message.channel.send("Resumed the song for you :)")
        }
        bot.distube.pause(message)
        message.channel.send("Paused the song for you :)")
    }
}
