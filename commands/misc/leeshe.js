module.exports = {
    config: {
        name: "이쉬",
        aliases: [`이쒸`],
        description: "이쒸",
        usage: "이쉬",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if (args[0]) {
            return;
        } else if (message.channel.topic != "-짤방") {
            return;
        }
        message.channel.send({ content: 'https://tenor.com/view/%EC%96%91%EC%95%84%EC%A7%80-mad-angry-you-wanna-fight-me-gif-17326578' })
    }
}