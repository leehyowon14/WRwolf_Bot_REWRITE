const fs = require('fs');

module.exports = {
    config: {
        name: `지젤`,
        aliases: [`${prefix}지구젤리`, `젤아`, '지젤이'],
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

        fs.readFile('./commands/non-slash/aespa/json/giselle.json', 'utf8', (err, data) => {
            if (err) throw err;
            let giselle_array = JSON.parse(data).messages
            let min = 0;
            let max = giselle_array.length;
            let msg = giselle_array[parseInt(Math.random() * (max - min) + min)];
            if (!msg) return message.reply({ content: '에러! 다시 시도해주세요' });
            message.reply({ content: msg });
        });
    }
}