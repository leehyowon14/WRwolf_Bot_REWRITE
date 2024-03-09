const protex = require('../../../db/protection_channel.js')
const { EmbedBuilder } = require("discord.js");

module.exports = {
    config: {
        name: "add_user",
        aliases: [`${prefix}add_channel`],
        description: "울프울프 프로텍션 채널 추가",
        usage: "add_user",
        accessableby: "Owner",
    },
    run: async (bot, message, args) => {
        // check if the command caller has permission to use the command
        if (message.author.id != adminId) return message.reply({ content: "너는 권한이 없어.", allowedMentions: { repliedUser: true } });
        
        let id = message.channelId;
        let time = getTime();

        let channel = await protex.findOne({channel_id: id})
        if (!channel) {
            channel = new protex({
                channel_id: id,
                register_date: time,
                is_Activated: true
            })
            await channel.save()
        } else {
            await protex.findOneAndUpdate({ channel_id: id }, { register_date: time, is_Activated: true });
        }
        let embed = new EmbedBuilder()
            .setTitle('완료!')
            .setDescription('변경사항이 저장되었습니다.')
            .setColor(0x00AE86)
        message.reply({ embeds: [embed] });
    }
}