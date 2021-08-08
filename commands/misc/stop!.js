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
        message.channel.send({ content: 'https://media1.tenor.com/images/d9599e2d1a5e6e492eb9efb63c87160b/tenor.gif?itemid=21048386' })
    }
}