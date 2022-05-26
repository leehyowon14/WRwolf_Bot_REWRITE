//https://docs.nekobot.xyz/#image-generation-trumptweet
const axios = require('axios');
const { MessageEmbed } = require("discord.js");

module.exports = {
	config: {
		name: "trumptweet",
		aliases: [`${prefix}trumptweet`, `${prefix}트럼프트윗`],

		accessableby: "Members",
	},
	core: async (bot, message, args) => {
        let response = await axios({
            method: 'get',
            url: encodeURI(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${args[0]}`),
        });
		if (response.status !== 200) return message.channel.send("api 서버 오류");
		av = response.data.message
        let embed = new MessageEmbed()
            .setColor('#186de6')
			.setTitle(`Donald Trump Tweeted:`)
            .setImage(av)
            .setTimestamp()
            .setFooter({ text: 'Developed by sG.wolf#5732' })
        message.channel.send({ embeds: [embed] })

	},
	run: async (bot, message, args) => {
		await module.exports.core(bot, message, args)
	}
}