const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "help",
        aliases: ["help"],
        description: "help",
        usage: "help",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let img = "https://media1.tenor.com/images/8e341309b7d312f35f1869b2ffcaa8e8/tenor.gif?itemid=20146933"
        let embed = new MessageEmbed()
            .setColor('#73c4fa')
            .setTitle('울프봇 명령어')
            .setAuthor('울프봇 도움말', img)
            .addField('\u200B', '\u200B')
            .addField('이쉬/이쒸', '이쒸')
            .addField('ㅂㄷㅂㄷ/qeqe', 'ㅂㄷㅂㄷ')
            .addField('!코로나/!covid', '전국/경북 코로나 확진자 현황')
            .addField('!한강', '한강 물 온도')
            .addField('!청소 (숫자)', '메세지 삭제하기')
            .addField('ㄱㅅㄱㅅㄱㅅㄱㅅ, rtrtrtrt, ㄳㄳㄳㄳ', '감사합니다아ㅏㅏ')
            .addField('you know that, you know it', '잠재적 동의?')
            .addField('!초대코드/!초대링크', '초대링크 만들기')
            .addField('fuck', '엿날리기', true)
            .addField('음', '펀쿨섹좌', true)
            .addField('!fy/!료', '엿날리기', true)
            .addField('투표(YES or NO)', '패치중...')
            .addField('!dm', '갠메 공지')
            .addField('\u200B', '\u200B')
            .addField('음악', '음악봇 명령어')
            .addField('-play[p] <음악 링크 or 제목>', '음악 재생', true)
            .addField('-stop', '음악 재생 정지', true )
            .addField('-repeat[loop][rp]', '반복재생 on/off')
            .addField('-skip', '음악 스킵', true)
            .addField('-volume[v][set][set-volume] <1~100까지의 숫자>', '볼륨 조절', true)
            .addField('-queue[q]', '재생중인 음악 정보')
            .addField('\u200B', '\u200B')
            .setTimestamp()
            .setFooter('Developed by 느윽대#5070', img)

        message.channel.send(embed)
    }
}