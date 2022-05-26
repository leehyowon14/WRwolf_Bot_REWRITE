//https://docs.nekobot.xyz/#image-generation-stickbug

const { MessageEmbed } = require("discord.js");
const axios = require('axios');
module.exports = {
	config: {
		name: "stickbug",
		aliases: [`${prefix}stickbug`],

		accessableby: "Members",
	},
	core: async (bot, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let av = member.user.displayAvatarURL(true)
        if (!av) {
            return message.channel.send("아바타를 구하지 못하였습니다.")
        }
        let response = await axios({
            method: 'get',
            url: `https://nekobot.xyz/api/imagegen?type=stickbug&url=${av}`,
        });
		if (response.status !== 200) return message.channel.send("api 서버 오류");
		av = response.data.message
        let embed = new MessageEmbed()
            .setColor('#186de6')
            .setTitle(`대벌레당했음 ㅋㅋㅋ`)
            .setUrl('https://namu.wiki/w/Get%20stick%20bugged%20lol')
            .setImage(av)
            .setTimestamp()
            .setFooter({ text: 'Developed by sG.wolf#5732' })
        message.channel.send({ embeds: [embed] })

	},
	run: async (bot, message, args) => {
		await module.exports.core(bot, message, args)
	}
}