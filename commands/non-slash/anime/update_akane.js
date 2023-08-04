const { EmbedBuilder } = require("discord.js");
const { search } = require("../../../modules/pixiv_keyword.js")
const fs = require('fs');

module.exports = {
    config: {
        name: `${prefix}update_akane`,
        description: "get akane image",
        usage: "!update_akane",
        accessableby: "Admin",
    },
    run: async (bot, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content: "너는 이 명령을 수행할 권한이 없어." })
        let obj = {"sfw" : [], "nsfw" : []}
        obj.sfw = await search(["黒川あかね"], false)
        obj.nsfw = await search(["黒川あかね"], true, "ふたなり")

        if (!obj.sfw || !obj.nsfw) return message.reply({ content: '에러! 다시 시도해주세요' })

        fs.writeFile('./commands/non-slash/anime/json/akane.json', JSON.stringify(obj), 'utf-8', function(error) {
            console.log('write end!');
        });

        let embed = new EmbedBuilder()
            .setTitle("Anime image update.")
            .setDescription(`Kurokawa akane's image has been updated successfully`)
            .setColor('#57F287')
        message.reply({ embeds: [embed] })
    }
}