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

        let id = mentioned_user.id;
        let time = getTime();

        let channel = await protex.findOne({channel_id: id})
        if (!channel) {
            channel = new protex({
                channel_id: id,
                register_date: time,
                is_Activated: false
            })
            await channel.save()
        } else {
            await protex.findOneAndUpdate({ channel_id: id }, { is_Activated: false });
        }
        let embed = new EmbedBuilder()
            .setTitle('완료!')
            .setDescription('변경사항이 저장되었습니다.')
            .setColor(0x00AE86)
        message.reply({ embeds: [embed] });
    }
}