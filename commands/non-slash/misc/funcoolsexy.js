module.exports = {
    config: {
        name: "funcoolsexy",
        aliases: ["음", "dma"],
        description: "fun/cool/sexy",
        usage: "음",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if (args[0]) {
            return;
        } else if (message.channel.topic != "-짤방") {
            return;
        }
        message.channel.send({ content: 'https://cdn.discordapp.com/attachments/742044949859795019/755704078943649862/FirmLoathsomeFrillneckedlizard-size_restricted.gif' })
    }
}