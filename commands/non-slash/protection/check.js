const protex = require('../../../db/protection.js')
const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "lisence_check",
        aliases: [`${prefix}lisence_check`],
        description: "울프울프 프로텍션 유저서정보",
        usage: "lisence_check <@username>",
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
        }
        

        let uid = user.user_id
        let embed
        if (user.is_Activated) {
            embed = new MessageEmbed()
                .setTitle("Protection")
                .setDescription(`Userinfo(${uid})`)
                .addField("Status", "Activated")
                .addField("Activation Date", user.register_date)
                .setColor('#57F287')
        } else {
            embed = new MessageEmbed()
                .setTitle("Protection")
                .setDescription(`Userinfo(${uid})`)
                .addField("Status", "Disactivated")
                .setColor('#ED4245')
        }
        message.reply({ embeds:[embed] })

    }
}