const Discord = require('discord.js')
const axios = require('axios');

module.exports = {
    config: {
        name: `dog`,
        aliases: [`${prefix}dog`],
        description: "",
        usage: "",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let response = await axios({
            method: 'get',
            url: `https://random.dog/woof.json`,
        });
        if (response.status !== 200) return message.channel.send("api 서버 오류");
        av = response.data.url
          let embed = new Discord.EmbedBuilder()
            .setTitle("Dog")
            .setImage(av)
            .setColor(`#FF0000`)
        message.channel.send({ embeds: [embed] });
    }
}