const { EmbedBuilder } = require("discord.js");

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
        let embed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('울프봇 명령어')
            .setAuthor({ name:'울프봇 도움말', url: img })
            .addFields(
                {name: '\u200B', value:'\u200B'},
                {name: '이쉬/이쒸', value:'이쒸'},
                {name: 'ㅂㄷㅂㄷ/qeqe', value:'ㅂㄷㅂㄷ'},
                {name: '멈춰!/멈춰!!', value:'학폭 멈춰!'},
                {name: `${prefix}코로나/!covid`, value:`전국 코로나 확진자 현황`},
                {name: `${prefix}한강/${prefix}river`, value:`한강 물 온도`},
                {name: 'ㄱㅅㄱㅅㄱㅅㄱㅅ, rtrtrtrt, ㄳㄳㄳㄳ', value:'감사합니다아ㅏㅏ'},
                {name: `${prefix}초대코드/${prefix}초대링크`, value:`초대링크 만들기`},
                {name: `${prefix}dice/${prefix}주사위`, value:'주사위 굴리기'},
                {name: `${prefix}random/${prefix}랜덤대답 [선택지1 선택지2....]`, value:'랜덤으로 고르기'},
                {name: '음', value:'펀쿨섹좌', inline: true},
                {name: `${prefix}userinfo [유저멘션]`, value:'유저정보', },
                {name: '!투표 (제목), (시간[단위: 초], (선택지1), (선택지2), (선택지3)....(최대 10개)', value:'투표.'},
                {name: '!아바타 [멘션]', value:'아바타 보기.'},
                {name: '\u200B', value:'\u200B'},
                {name: `${prefix}ad_help`, value:'어드민 명령어'},
                {name: `${prefix}nsfw_help`, value:'NSFW 명령어'},
                {name: `${prefix}image_help`, value:'짤방 명령어'},
                {name: '음악', value:'음악 명령어'},
                {name: '\u200B', value:'\u200B'},
                {name: `로그`, value:`로그를 보기 위해서 시스템 채널을 설정해주세요!.`},
                {name: `설정 방법`, value:`서버설정-일반-시스템 메세지 채널`},
                {name: `로그`, value:`짤방기능 사용을 위해서 채팅방의 주제를 "-짤방"으로 설정하여 주세요`},
            )
            .setTimestamp()
            .setFooter({ text: 'Developed by sG.wolf#5732', iconURL: img })

        message.channel.send({ embeds: [embed] })
    }
}