const { EmbedBuilder } = require('discord.js');
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
        let school_type
        let school_region
        if (user.school_type == "Symbol(KINDERGARTEN)") {
            school_type = School.Type.KINDERGARTEN
        } else if  (user.school_type == "Symbol(ELEMENTARY)") {
            school_type = School.Type.ELEMENTARY
        } else if (user.school_type == "Symbol(MIDDLE)") {
            school_type = School.Type.MIDDLE
        } else if (user.school_type == "Symbol(HIGH)") {
            school_type = School.Type.HIGH
        } else {
            return
        }

        if (user.school_region == "Symbol(SEOUL)") {
            school_region = School.Region.SEOUL
        } else if (user.school_region == "Symbol(INCHEON)") {
            school_region = School.Region.INCHEON
        } else if (user.school_region == "Symbol(BUSAN)") {
            school_region = School.Region.BUSAN
        } else if (user.school_region == "Symbol(GWANGJU)") {
            school_region = School.Region.GWANGJU
        } else if (user.school_region == "Symbol(DAEJEON)") {
            school_region = School.Region.DAEJEON
        } else if (user.school_region == "Symbol(DAEGU)") {
            school_region = School.Region.DAEGU
        } else if (user.school_region == "Symbol(SEJONG)") {
            school_region = School.Region.SEJONG
        } else if (user.school_region == "Symbol(ULSAN)") {
            school_region = School.Region.ULSAN
        } else if (user.school_region == "Symbol(GYEONGGI)") {
            school_region = School.Region.GYEONGGI
        } else if (user.school_region == "Symbol(KANGWON)") {
            school_region = School.Region.KANGWON
        } else if (user.school_region == "Symbol(CHUNGBUK)") {
            school_region = School.Region.CHUNGBUK
        } else if (user.school_region == "Symbol(CHUNGNAM)") {
            school_region = School.Region.CHUNGNAM
        } else if (user.school_region == "Symbol(GYEONGBUK)") {
            school_region = School.Region.GYEONGBUK
        } else if (user.school_region == "Symbol(GYEONGNAM)") {
            school_region = School.Region.GYEONGNAM
        } else if (user.school_region == "Symbol(JEONBUK)") {
            school_region = School.Region.JEONBUK
        } else if (user.school_region == "Symbol(JEONNAM)") {
            school_region = School.Region.JEONNAM
        } else if (user.school_region == "Symbol(JEJU)") {
            school_region = School.Region.JEJU
        } else {
            return;
        }
        try{
            school.init(school_type, school_region, user.school_code)

            let meal_ = await school.getMeal({
                default: '급식이 없습니다.'
            })
            let embed = new EmbedBuilder()
                .setTitle(`${school_name}의 오늘자 급식`)
                .setDescription(meal_.today)
                .setColor(0xFFFFFF)
                .setTimestamp()
            return message.reply({ embeds: [embed], allowedMentions: {repliedUser: true} });
        } catch (e) {
            let embed = new EmbedBuilder()
                .setTitle(`오류`)
                .setDescription(e)
                .setTimestamp()
            message.reply({ embeds: [embed], allowedMentions: {repliedUser: true} });
        }
    }
}