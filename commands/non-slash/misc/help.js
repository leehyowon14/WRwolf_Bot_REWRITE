const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: `help`,
        aliases: [`${prefix}help`],
        description: "help",
        usage: "help",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if (args[0]) {
            return;
        }
        let img = "https://media1.tenor.com/images/8e341309b7d312f35f1869b2ffcaa8e8/tenor.gif?itemid=20146933"
        let embed = new MessageEmbed()
            .setColor('#5865F2')
            .setTitle('울프봇 명령어')
            .setAuthor('울프봇 도움말', img)
            .addField('\u200B', '\u200B')
            .addField('이쉬/이쒸', '이쒸')
            .addField('ㅂㄷㅂㄷ/qeqe', 'ㅂㄷㅂㄷ')
            .addField('멈춰!/멈춰!!', '학폭 멈춰!')
            .addField(`${prefix}코로나/!covid`, `전국/경북 코로나 확진자 현황`)
            .addField(`${prefix}한강/${prefix}river`, `한강 물 온도`)

            .addField('ㄱㅅㄱㅅㄱㅅㄱㅅ, rtrtrtrt, ㄳㄳㄳㄳ', '감사합니다아ㅏㅏ')
            //.addField('you know that, you know it', '잠재적 동의?')
            .addField(`${prefix}초대코드/${prefix}초대링크`, `초대링크 만들기`)
            .addField(`${prefix}dice/${prefix}주사위`, '주사위 굴리기')
            .addField(`${prefix}random/${prefix}랜덤대답 [선택지1 선택지2....]`, '랜덤으로 고르기')
            //.addField('fuck', '엿날리기', true)
            .addField('음', '펀쿨섹좌', true)
            //.addField(`${prefix}fy/${prefix}료`, '엿날리기', true)
            .addField(`${prefix}userinfo [유저멘션]`, '유저정보', )
            .addField('!투표 (제목), (시간[단위: 초], (선택지1), (선택지2), (선택지3)....(최대 10개)', '투표.')
            .addField('!아바타 [멘션]', '아바타 보기.')
            //.addField('!dm', '갠메 공지')
            .addField('\u200B', '\u200B')
            //.addField(`${prefix}music_help`, '음악봇 명령어')
            .addField(`${prefix}ad_help`, '어드민 명령어')
            .addField('음악', '음악 명령어')
            .addField(`${prefix}spotify/${prefix}스포티 <제목>`, '음악 검색', true)
            //.addField('-play[p] <음악 링크 or 제목>', '음악 재생', true)
            //.addField('-stop', '음악 재생 정지', true )
            //.addField('-repeat[loop][rp]', '반복재생 on/off')
            //.addField('-skip', '음악 스킵', true)
            //.addField('-volume[v][set][set-volume] <1~100까지의 숫자>', '볼륨 조절', true)
            //.addField('-queue[q]', '재생중인 음악 정보')
            .addField('\u200B', '\u200B')
            .addField(`로그`, `로그를 보기 위해서 시스템 채널을 설정해주세요!.`)
            .addField(`설정 방법`, `서버설정-일반-시스템 메세지 채널`)
            .addField(`로그`, `짤방기능 사용을 위해서 채팅방의 주제를 "-짤방"으로 설정하여 주세요`)
            .setTimestamp()
            .setFooter('Developed by sG.wolf#7777', img)

        message.channel.send({ embeds: [embed] })
    }
}