const Discord = require('discord.js')
const axios = require('axios');

module.exports = {
    config: {
        name: `programmermeme`,
        aliases: [`${prefix}programmermeme`],
        description: "",
        usage: "",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let response = await axios({
            method: 'get',
            url: `https://www.reddit.com/r/ProgrammerHumor/random.json?limit=1`,
        });
        if (response.status !== 200) return message.channel.send("api 서버 오류");
        av = response.data.body[0].data.children[0].data.url
          let embed = new Discord.EmbedBuilder()
            .setTitle("Programmer Humor")
            .setDescription("Programmer Humor from Reddit.")
            .setImage(av)
            .setColor(`#FF0000`)
        message.channel.send({ embeds: [embed] });
    }
}