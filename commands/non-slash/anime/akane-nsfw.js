const axios = require('axios');
const fs = require('fs');
const { AttachmentBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    config: {
        name: "퍄카네",
        aliases: [`${prefix}nsfw-akane`, `와캬퍄헉농쭉아`, `아카넥스`],
        description: "아카네 NSFW 짤",
        usage: "퍄카네",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if (args[0]) {
            return;
        } else if (message.channel.topic != "-짤방") {
            return;
        }

        if (!message.channel.nsfw) {
            message.react('💢');

            return message.reply({ content : `이곳은 NSFW채널이 아닙니다.`, allowedMentions: {repliedUser: true} })
        }

        fs.readFile('./commands/non-slash/anime/json/akane.json', 'utf8', async function (err, data) {
            if (err) throw err;
            let akane_array = JSON.parse(data).nsfw
            let min = 0;
            let max = akane_array.length;
            if (max == 0) return message.reply({ content: "bot has been updated. please use '!update_akane' first(Administrators only)." });
            let obj = akane_array[parseInt(Math.random() * (max - min) + min)];
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
                .setAuthor({ name: obj.alt, iconUrl: obj.profileImageUrl })
                .setTitle("Kurokawa Aakane's image")
                .setDescription(`pixiv id: ${obj.id}`)
                .setImage(`attachment://FILE.${ext}`)
                .setColor(`#2C278F`)
                .setTimestamp()
                .setFooter({ text: `Create Date: ${obj.createDate}` })
            message.reply({ embeds: [embed], files: [file] });
        });
    }
}