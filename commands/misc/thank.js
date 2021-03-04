module.exports = {
    config: {
        name: "rtrtrtrt",
        aliases: ["ㄱㅅㄱㅅㄱㅅㄱㅅ", "ㄳㄳㄳㄳ"],
        description: "ㄳㄳㄳㄳ",
        usage: "ㄳㄳㄳㄳ",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if (args[0]) {
            return;
        }
        message.channel.send('https://media.discordapp.net/attachments/785910540526157864/793784533350219786/ezgif.com-gif-maker_3.gif')
    }
}