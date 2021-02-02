module.exports = {
    config: {
        name: "ping",
        aliases: ["ping"],
        description: "핑 상태",
        usage: "ping",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        message.channel.send(`🏓 Ping!`).then(m => {
            // m.edit(`🏓 Pong! (💙: ${m.createdTimestamp - message.createdTimestamp}ms. :purple_heart:: ${Math.round(bot.ws.ping)}ms.)`);
            m.edit(`🏓 Pong! (💙: ${m.createdTimestamp - message.createdTimestamp}ms.)`);
        });
    }
}