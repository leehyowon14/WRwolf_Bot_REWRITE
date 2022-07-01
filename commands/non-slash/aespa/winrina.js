const fs = require('fs');

module.exports = {
    config: {
        name: "위리나",
        aliases: [`${prefix}winrina`, `윈리나`, '윈나'],
        description: "윈터 & 카리나 짤",
        usage: "윈리나",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if (args[0]) {
            return;
        } else if (message.channel.topic != "-짤방") {
            return;
        }

        fs.readFile('./commands/non-slash/aespa/json/winrina.json', 'utf8', (err, data) => {
            if (err) throw err;
            let winrina_array = JSON.parse(data).messages
            let min = 0;
            let max = winrina_array.length;
            let msg = winrina_array[parseInt(Math.random() * (max - min) + min)];
            if (!msg) return message.reply({ content: '에러! 다시 시도해주세요' });
            message.reply({ content: msg });
        });
    }
}