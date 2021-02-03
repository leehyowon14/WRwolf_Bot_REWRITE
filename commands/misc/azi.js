module.exports = {
    config: {
        name: "azi",
        aliases: ["양아지는"],
        description: "사랑이다",
        usage: "양아지는",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        message.channel.send('사랑이다\n```\n퓌봉님 요청\n```')       
    }
}