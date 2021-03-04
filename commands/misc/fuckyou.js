module.exports = {
    config: {
        name: `${prefix}fuckyou`,
        aliases: [`${prefix}fy`, `${prefix}료`],
        description: "fuck you bitch",
        usage: "fy",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if (args[0]) {
            return;
        }
        message.channel.send(`fuck you bitch`)
        message.channel.send(':middle_finger:')
    }
}