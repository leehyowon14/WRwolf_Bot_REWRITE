const fs = require('fs');

module.exports = {
    config: {
        name: "겨울이",
        aliases: [`${prefix}winter`, `${prefix}겨울`],
        description: "겨울이 짤",
        usage: "겨울이",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if (args[0]) {
            return;
        } else if (message.channel.topic != "-짤방") {
            return;
        }

        fs.readFileSync('./commands/non-slash/aespa/json/winter.json', 'utf8', (err, data) => {
            if (err) throw err;
            let winter_array = JSON.parse(data).messages
            let min = 0;
            let max = winter_array.length;
            let msg = winter_array[parseInt(Math.random() * (max - min) + min)];
            message.channel.send({ content: msg })
        });
    }
}