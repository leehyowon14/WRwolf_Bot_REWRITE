const axios = require('axios');
const fs = require('fs');
const { AttachmentBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    config: {
        name: "아쿠아카네",
        aliases: [`${prefix}aquakane`],
        description: "아쿠아 & 아카네 SFW 짤",
        usage: "아쿠아카네",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if (args[0]) {
            return;
        } else if (message.channel.topic != "-짤방") {
            return;
        }

        fs.readFile('./commands/non-slash/anime/json/aquakane.json', 'utf8', async function (err, data) {
            if (err) throw err;
            let aquakane_array = JSON.parse(data).sfw
            let min = 0;
            let max = aquakane_array.length;
            if (max == 0) return message.reply({ content: "bot has been updated. please use '!update_aquakane' first(Administrators only)." });
            let obj = aquakane_array[parseInt(Math.random() * (max - min) + min)];
            if (!obj) return message.reply({ content: '에러! 다시 시도해주세요' });
            
            let response = await axios({
                method: 'get',
                url: obj.url,
                headers: { 'Referer': 'https://www.pixiv.net/' },
                responseType: 'stream'
            });

            let ext = obj.url.split('.')[obj.url.split('.').length - 1];
            let file = new AttachmentBuilder(response.data, {name: `FILE.${ext}`})

            let embed = new EmbedBuilder()
                .setAuthor({ name: obj.alt })
                .setTitle("Kurokawa Aakane& Hoshino Aqua's image")
                .setDescription(`pixiv id: [${obj.id}](https://www.pixiv.net/artworks/${obj.id})`)
                .setImage(`attachment://FILE.${ext}`)
                .setColor(`#2C278F`)
                .setTimestamp()
                .setFooter({ text: `Create Date: ${obj.createDate}` })
            message.reply({ embeds: [embed], files: [file] });
        });
    }
}