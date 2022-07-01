const fs = require('fs');

module.exports = {
    config: {
        name: "aespa",
        aliases: [`${prefix}aespa`],
        description: "에스파 짤",
        usage: "aespa",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if (args[0]) {
            return;
        } else if (message.channel.topic != "-짤방") {
            return;
        }

        fs.readFile('./commands/non-slash/aespa/json/aespa.json', 'utf8', (err, data) => {
            if (err) throw err;
            let aespa_array = JSON.parse(data).messages
            let min = 0;
            let max = aespa_array.length;
            let msg = aespa_array[parseInt(Math.random() * (max - min) + min)];
            if (!msg) return message.reply({ content: '에러! 다시 시도해주세요' });
            message.reply({ content: msg });
        });
    }
}