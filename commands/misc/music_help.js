const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "music_help",
        aliases: [`${prefix}music_help`],
        description: "음악봇 명령어",
        usage: "music_help",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        let img = "https://media1.tenor.com/images/8e341309b7d312f35f1869b2ffcaa8e8/tenor.gif?itemid=20146933"
        let embed = new MessageEmbed()
            .setColor('#73c4fa')
            .setTitle('울프봇(음악) 명령어')
            .setAuthor('울프봇(음악) 도움말', img)
            .addField('\u200B', '\u200B')
            .addField(`${prefix}p/${prefix}play/${prefix}재생 [음악이름/링크]`, `음악재생`)
            .addField(`${prefix}skip/${prefix}s/${prefix}다음곡`, `스킵`)
            .addField(`${prefix}현재음악/${prefix}nowplaying/${prefix}np`, `현재 재생중인 곡`)
            .addField(`${prefix}list/${prefix}곡목록`, '음악 예약 목록')
            .addField(`${prefix}v/${prefix}volume/${prefix}불륨 [숫자]`, '불륨 조절')
            .addField(`${prefix}repeat/${prefix}r/${prefix}반복`, '음악 무한반복')
            .addField(`${prefix}qclear/${prefix}qc/${prefix}큐삭제`, '음악 대기열 삭제')
            .addField(`${prefix}pause/${prefix}일시정지`, '음악 일시정지')
            .addField(`${prefix}resume/${prefix}재생`, '일시정지했던 음악 다시 재생')
            .addField(`${prefix}stop/${prefix}leave/${prefix}나가`, '음악 듣기 중단')
            .addField('\u200B', '\u200B')
            .addField("관리자 전용 명령어", "관리자만 쓸수있는 음악관련 명령어")
            .addField(`${prefix}dj [멘션]`, `DJ권한 주기/뺏기 (DJ역할이 없을때는 자동으로 생성됨)`)
            .addField('\u200B', '\u200B')
            .setTimestamp()
            .setFooter('Developed by 느윽대#5070', img)

        message.channel.send(embed)
    }
}