module.exports = {
    config: {
        name: "멈춰!!",
        aliases: [`ajacnj!!`],
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if (args[0]) {
            return;
        }
        message.channel.send('https://media1.tenor.com/images/4a34b3bb099c6c1e4dbe96fd6576f327/tenor.gif?itemid=20809990')
    }
}