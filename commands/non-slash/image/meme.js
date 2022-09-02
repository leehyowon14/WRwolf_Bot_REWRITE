const Discord = require('discord.js')
const axios = require('axios');

module.exports = {
    config: {
        name: `meme`,
        aliases: [`${prefix}meme`],
        description: "",
        usage: "",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let response = await axios({
            method: 'get',
            url: `https://api.imgflip.com/get_memes`,
        });
        if (response.status !== 200 || !response.data.success) return message.channel.send("api 서버 오류");
        let random = Math.floor(Math.random() * response.data.data.memes.length)
        av = response.data.data.memes[random].url
          let embed = new Discord.EmbedBuilder()
            .setTitle("Meme")
            .setAuthor({ name: response.data.data.memes[random].name})
            .setDescription("Memes from Imgflip.")
            .setImage(av)
            .setColor(`#FF0000`)
        message.channel.send({ embeds: [embed] });
    }
}