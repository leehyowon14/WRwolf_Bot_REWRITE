module.exports = {
    config: {
        name: "hmm....",
        aliases: ["흠...", "gma..."],
        description: ":thinking",
        usage: "흠...",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if (args[0]) {
            return;
        } else if (message.channel.topic != "-짤방") {
            return;
        }
        message.channel.send({ content: '🤔' })
    }
}