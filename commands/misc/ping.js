module.exports = {
    config: {
        name: `ping`,
        aliases: [`${prefix}ping`],
        description: "핑 상태",
        usage: "ping",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        if (message.content == this.config.name) {
            return;
        }
        if (args[0]) {
            return;
        }
        message.channel.send(`🏓 Ping!`).then(m => {
            // m.edit(`🏓 Pong! (💙: ${m.createdTimestamp - message.createdTimestamp}ms. :purple_heart:: ${Math.round(bot.ws.ping)}ms.)`);
            m.edit(`🏓 Pong! (💙: ${m.createdTimestamp - message.createdTimestamp}ms.)`);
        });
    }
}