const Discord = require('discord.js')
const axios = require('axios');

module.exports = {
    config: {
        name: `cat`,
        aliases: [`${prefix}cat`],
        description: "",
        usage: "",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let response = await axios({
            method: 'get',
            url: `https://api.thecatapi.com/v1/images/search`,
        });
        if (response.status !== 200) return message.channel.send("api 서버 오류");
        av = response.data[0].url
          let embed = new Discord.EmbedBuilder()
            .setTitle("Cat")
            .setImage(av)
            .setColor(`#FF0000`)
        message.channel.send({ embeds: [embed] });
    }
}