const fs = require('fs');
module.exports = {
    config: {
        name: "리나",
        aliases: [`${prefix}karina`, `${prefix}리나야`],
        description: "카리나 짤",
        usage: "리나야",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if (args[0]) {
            return;
        } else if (message.channel.topic != "-짤방") {
            return;
        }

        fs.readFileSync('./json/karina.json', 'utf8', (err, data) => {
            if (err) throw err;
            let karina_array = JSON.parse(data).messages
            let min = 0;
            let max = karina_array.length;
            let msg = karina_array[parseInt(Math.random() * (max - min) + min)];
            message.channel.send({ content: msg });
        });
    }
}