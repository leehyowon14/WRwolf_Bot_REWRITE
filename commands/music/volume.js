module.exports = {
    config: {
    name: "volume",
    aliases: ["v", "set", "set-volume"],
    inVoiceChannel: true,
    },
    run: async (bot, message, args) => {
        const queue = bot.distube.getQueue(message)
        if (!queue) return message.channel.send(`${bot.emotes.error} | There is nothing in the queue right now!`)
        const volume = parseInt(args[0])
        if (isNaN(volume)) return message.channel.send(`${bot.emotes.error} | Please enter a valid number!`)
        bot.distube.setVolume(message, volume)
        message.channel.send(`${bot.emotes.success} | Volume set to \`${volume}\``)
    }
}
