module.exports = {
    config: {
    name: "queue",
    aliases: [`${prefix}q`],
    },
    run: async (bot, message, args) => {
        const queue = bot.distube.getQueue(message)
        if (!queue) return message.channel.send(`${bot.emotes.error} | There is nothing playing!`)
        const q = queue.songs.map((song, i) => `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join("\n")
        message.channel.send(`${bot.emotes.queue} | **Server Queue**\n${q}`)
    }
}
