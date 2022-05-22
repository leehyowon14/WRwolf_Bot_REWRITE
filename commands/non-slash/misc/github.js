const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const moment = require("moment-timezone");
moment.locale("ko-KR");

module.exports = {
    config: {
        name: `github`,
        aliases: [`${prefix}깃허브`, `${prefix}깃헙`, `${prefix}github`],
        description: "깃허브 검색",
        usage: "github [이름]",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if (!args[0]) {
            let embed = new MessageEmbed()
            .setColor('#f94343')
            .setAuthor({ name: '에러!' })
            .setTitle('검색할 유저이름을 입력하여 주세요')
            .setTimestamp()
            .setFooter({ text: 'Developed by sG.wolf#5732' })
        message.channel.send({ embeds: [embed] })
        return;
        }

        const { login, avatar_url, location, created_at, followers, following, email, blog, html_url, bio, public_repos, public_gists } = await fetch(`https://api.github.com/users/${encodeURI(args.join(" "))}`).then(e => e.json());

        if (!login) {
            let embed = new MessageEmbed()
            .setColor('#f94343')
            .setAuthor({ name: '에러!' })
            .setTitle(`\`${args.join(" ")}\` (이)라는 유저를 찾을 수 없습니다.`)
            .setTimestamp()
            .setFooter({ text: 'Developed by sG.wolf#5732' })
        message.channel.send({ embeds: [embed] })
        return;
        }

        let embed = new MessageEmbed().setTitle(`${login}님의 정보`).setColor(0x000000).setAuthor('Github', 'https://github.githubassets.com/favicons/favicon.png', 'https://github.com/').setFooter(login, avatar_url).setDescription(`[들어가기](${html_url})`).setThumbnail(avatar_url)
        .addFields([
            {name: "이름", value: `**${login}**`, inline: true},
            {name: "상태 메세지", value: `**${bio ? bio : "없음"}**`},
            {name: "지역", value: `**${location ? location : "없음"}**`},
            {name: "레포지토리", value: `**${public_repos ? `${public_repos}개` : "없음"}**`, inline: true},
            {name: "Gist", value: `**${public_gists ? `${public_gists}개` : "없음"}**`, inline: true},
            {name: "블로그", value: `**${blog ? blog : "없음"}**`},
            {name: "팔로워", value: `**${followers ? `${followers}명` : "없음"}**`, inline: true},
            {name: "팔로잉", value: `**${following ? `${following}명` : "없음"}**`, inline: true},
            {name: "가입 날짜", value: `**${moment(created_at).tz("Asia/seoul").format("YYYY년 MM월 DD일 dd요일 HH시 mm분")}**`},
            {name: "이메일", value: `**${email ? email : "없음"}**`, inline: true}
        ]);
        message.channel.send({ embeds: [embed] })
    }
};