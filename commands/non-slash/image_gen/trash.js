//https://docs.nekobot.xyz/#image-generation-trash
const axios = require('axios');
const { EmbedBuilder } = require("discord.js");

module.exports = {
	config: {
		name: "trash",
		aliases: [`${prefix}trash`, `${prefix}쓰레기`],

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
            url: `https://nekobot.xyz/api/imagegen?type=trash&url=${av}`,
        });
		if (response.status !== 200) return message.channel.send("api 서버 오류");
		av = response.data.message
        let embed = new EmbedBuilder()
            .setColor('#186de6')
            .setTitle(`왜 일본은 모든 것을 애니로 바꾸려 하는거야? (절레절레)`)
            .setImage(av)
            .setTimestamp()
            .setFooter({ text: 'Developed by Wonny._.lee#5732' })
        message.channel.send({ embeds: [embed] })

	},
	run: async (bot, message, args) => {
		await module.exports.core(bot, message, args)
	}
}