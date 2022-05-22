const { Canvas } = require('canvas-constructor');
const { MessageAttachment, MessageEmbed } = require('discord.js');


let font_path = `./assets/fonts/GmarketSansTTFMedium.ttf`;
Canvas.registerFont(font_path, 'GmarketSans')


module.exports = {
	config: {
		name: "avatar",
		aliases: [`${prefix}아바타`, `${prefix}av`, `${prefix}avatar`],
		description: "아바타",
		usage: "avatar <@username>",

		accessableby: "Members",
	},
	core: async (bot, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let av = member.user.displayAvatarURL(true)
        if (!av) {
            return message.channel.send("아바타를 구하지 못하였습니다.")
        }
        let embed = new MessageEmbed()
            .setColor('#186de6')
            .setTitle(`${member.user.username}님의 아바타`)
            .setImage(av)
            .setTimestamp()
            .setFooter('Developed by sG.wolf#5732')
        message.channel.send({ embeds: [embed] })

	},
	run: async (bot, message, args) => {
		await module.exports.core(bot, message, args)
	}
}