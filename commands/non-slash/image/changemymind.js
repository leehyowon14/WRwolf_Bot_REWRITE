//https://docs.nekobot.xyz/#image-generation-changemymind

const { EmbedBuilder } = require("discord.js");
const axios = require('axios');
module.exports = {
	config: {
		name: "changemymind",
		aliases: [`${prefix}changemymind`],

		accessableby: "Members",
	},
	core: async (bot, message, args) => {
		args = args.join(" ");
        let response = await axios({
            method: 'get',
            url: encodeURI(`https://nekobot.xyz/api/imagegen?type=changemymind&text=${args}`),
        });
		if (response.status !== 200) return message.channel.send("api 서버 오류");
		av = response.data.message
        let embed = new EmbedBuilder()
            .setColor('#186de6')
			.setTitle(`어디 한번 내 마음을 바꿔봐`)
            .setImage(av)
            .setTimestamp()
            .setFooter({ text: 'Developed by sG.wolf#5732' })
        message.channel.send({ embeds: [embed] })

	},
	run: async (bot, message, args) => {
		await module.exports.core(bot, message, args)
	}
}