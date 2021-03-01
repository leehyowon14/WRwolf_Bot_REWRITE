module.exports = {
    config: {
    name: "resume",
    aliases: [`${prefix}resume`, `${prefix}unpause`],
    inVoiceChannel: true,
    },
    run: async (bot, message, args) => {
        const queue = bot.distube.getQueue(message)
        if (!queue) return message.channel.send(`${bot.emotes.error} | There is nothing in the queue right now!`)
        bot.distube.resume(message)
        message.channel.send("Resumed the song for you :)")
    }
}
