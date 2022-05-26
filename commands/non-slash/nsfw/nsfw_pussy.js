const Discord = require('discord.js')
const axios = require('axios');

module.exports = {
    config: {
        name: `pussy`,
        aliases: [`${prefix}pussy`],
        description: "",
        usage: "",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        //Checks channel for nsfw
   
        if (!message.channel.nsfw) {
            message.react('💢');

            return message.reply({ content : `이곳은 NSFW채널이 아닙니다.`, allowedMentions: {repliedUser: true} })
        }
        let response = await axios({
            method: 'get',
            url: `https://nekobot.xyz/api/image?type=pussy`,
        });
        if (response.status !== 200) return message.channel.send("api 서버 오류");
        av = response.data.message

        let embed = new Discord.MessageEmbed()
            .setTitle("pussy")
            .setImage(av)
            .setColor(`#FF0000`)
        message.channel.send({ embeds: [embed] });
    }
};