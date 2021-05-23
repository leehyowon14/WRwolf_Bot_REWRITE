module.exports = {
    config: {
        name: "멈춰!",
        aliases: [`ajacnj!`],
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if (args[0]) {
            return;
        }
        message.channel.send('https://media.tenor.co/videos/15b7054826ae5754559e65770c675fb6/mp4')
    }
}