module.exports = {
    config: {
        name: "fuckyou",
        aliases: ["fy", "료"],
        description: "fuck you bitch",
        usage: "fy",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        message.channel.send(`fuck you bitch`)
        message.channel.send(':middle_finger:')
    }
}