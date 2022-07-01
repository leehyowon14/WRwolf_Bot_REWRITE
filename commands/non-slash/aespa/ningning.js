const fs = require('fs');

module.exports = {
    config: {
        name: "닝닝아",
        aliases: [`${prefix}ningning`, `닝아`, '닝닝'],
        description: "닝닝 짤",
        usage: "닝닝아",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if (args[0]) {
            return;
        } else if (message.channel.topic != "-짤방") {
            return;
        }

        fs.readFile('./commands/non-slash/aespa/json/ningning.json', 'utf8', (err, data) => {
            if (err) throw err;
            let ningning_array = JSON.parse(data).messages
            let min = 0;
            let max = ningning_array.length;
            let msg = ningning_array[parseInt(Math.random() * (max - min) + min)];
            if (!msg) return message.reply({ content: '에러! 다시 시도해주세요' });
            message.reply({ content: msg });
        });
    }
}