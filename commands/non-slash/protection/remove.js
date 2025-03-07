const protex = require('../../../db/protection.js')
const { EmbedBuilder } = require("discord.js");

module.exports = {
    config: {
        name: "remove_user",
        aliases: [`${prefix}remove_user`],
        description: "울프울프 프로텍션 유저 삭제",
        usage: "remove_user <@username>",
        accessableby: "Owner",
    },
    run: async (bot, message, args) => {
        // check if the command caller has permission to use the command
        if (message.author.id != adminId) return message.reply({ content: "너는 권한이 없어.", allowedMentions: {repliedUser: true} });

        let mentioned_user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mentioned_user) return message.channel.send({content: "사용자를 입력하지 않았습니다.\n사용법 : " + module.exports.config.usage });

        let id = mentioned_user.id;
        let time = getTime();

        let user = await protex.findOne({user_id: id})
        if (!user) {
            user = new protex({
                user_id: id,
                register_date: time,
                is_Activated: false
            })
            await user.save()
        } else {
            await protex.findOneAndUpdate({ user_id: id }, { is_Activated: false });
        }
        let embed = new EmbedBuilder()
            .setTitle('완료!')
            .setDescription('변경사항이 저장되었습니다.')
            .setColor(0x00AE86)
        message.reply({ embeds: [embed] });
    }
}