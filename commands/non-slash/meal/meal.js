const { MessageEmbed } = require('discord.js');
const meal = require('../../../db/meal.js');
const School = require('school-kr');
const school = new School();


module.exports = {
    config: {
        name: "오늘급식",
        aliases: [`${prefix}오늘급식`, `${prefix}meal`],
        description: "당일 급식 조회",
        usage: "!오늘급식",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if (args[0]) {
            return;
        }
        let user = await meal.findOne({user_id: message.author.id})
        if (!user) {
            return message.reply({ content : `학교를 먼저 설정하여 주세요.`, allowedMentions: {repliedUser: true} });
        }
        let school_name = user.school_name
        school.init(user.school_type, user.school_region, user.school_code)

        let meal_ = await school.getMeal({
            default: '급식이 없습니다.'
        })
        let embed = new MessageEmbed()
            .setTitle(`${school_name}의 오늘자 급식`)
            .setDescription(meal_.today)
            .setColor(0xFFFFFF)
            .setTimestamp()
        return message.reply({ embeds: [embed], allowedMentions: {repliedUser: true} });
    }
}