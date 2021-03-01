module.exports = {
    config: {
    name: "play",
    aliases: ["p"],
    inVoiceChannel: true,
    },
    run: async (bot, message, args) => {
        const string = args.join(" ")
        if (!string) return message.channel.send(`${bot.emotes.error} | Please enter a song url or query to search.`)
        try {
            bot.distube.play(message, string)
        } catch (e) {
            message.channel.send(`${bot.emotes.error} | Error: \`${e}\``)
        }
    }
}
