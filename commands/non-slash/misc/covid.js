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
            updatetime = updatetime[0] + "년 " + updatetime[1] + "월 " + updatetime[2] + "일  " + updatetime[3].split(":")[0] + "시 " + updatetime[3].split(":")[1] + "분";
            let list = data.data.dailyCnt.reverse();
            let list_av = data.data.average.reverse();
            let date = data.data.xAxis.reverse();
            let year = data.updatetime.slice(0,5);


    let embed = new MessageEmbed()
        .setTitle('코로나 확진자 현황')
        .setColor('#FEE75C')
        .setDescription(`${updatetime} 기준.`)
        .addField(`총 확진자수(` + year + date[0] + `)`, list[0] + `명`)
        .addField(`7일 평균`, list_av[0] + `명`, true)
        .addField(`어제(` + year + date[1] + `) 확진자수`, list[1] + `명`)
        .setTimestamp()
        .setFooter('Developed by sG.wolf')
    message.channel.send({ embeds: [embed] })
  })
    }
}

