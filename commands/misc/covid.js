const request = require("request")
const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: `covid`,
        aliases: [`${prefix}코로나`, `${prefix}covid`],
        description: "대한민국 코로나 상태",
        usage: "cv",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        if (args[0]) {
            return;
        }
        let url = "https://m.search.naver.com/p/csearch/content/nqapirender.nhn?where=m&pkid=9005&key=diffV2API";
        request(url, (error, response, body) => {
            let data = JSON.parse(body).result;
            let updatetime = data.updatetime.split('.');
            updatetime = updatetime[0] + "년 " + updatetime[1] + "월 " + updatetime[2] + "일  " + updatetime[3].split(":")[0] + "시 " + updatetime[3].split(":")[0] + "분";
            let list = data.list.reverse();


    let embed = new MessageEmbed()
        .setTitle('코로나 확진자 현황')
        .setColor('#FEE75C')
        .setDescription(`${updatetime} 기준.`)
        .addField(`총 확진자수(` + list[0][0] + `)`, list[0][1] + `명`)
        .addField(`국내 발생`, list[0][2] + `명`, true)
        .addField(`해외 유입`, list[0][3] + `명`, true)
        .addField(`어제(` + list[1][0] + `) 확진자수`, list[1][1] + `명`)
    message.channel.send({ embeds: [embed] })
  })
    }
}

