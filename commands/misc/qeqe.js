module.exports = {
    config: {
        name: "qeqe",
        aliases: [`ㅂㄷㅂㄷ`],
        description: "ㅂㄷㅂㄷ",
        usage: "ㅂㄷㅂㄷ",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if (args[0]) {
            return;
        } else if (message.channel.topic != "-짤방") {
            return;
        }
        message.channel.send({ content: 'https://tenor.com/view/%EC%96%91%EC%95%84%EC%A7%80-fist-angry-mad-gif-17326572' })
    }
}