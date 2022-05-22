const fs = require('fs');

module.exports = {
    config: {
        name: "리나야",
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

        fs.readFile('./commands/non-slash/aespa/json/karina.json', 'utf8', (err, data) => {
            if (err) throw err;
            let karina_array = JSON.parse(data).messages
            let min = 0;
            let max = karina_array.length;
            let msg = karina_array[parseInt(Math.random() * (max - min) + min)];
            if (!msg) return message.reply({ content: '에러! 다시 시도해주세요' });
            message.reply({ content: msg });
        });
    }
}