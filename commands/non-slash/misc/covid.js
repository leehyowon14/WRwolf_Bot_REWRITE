const axios = require('axios');
const { MessageEmbed } = require("discord.js");

async function naver_covid() {
    let response = await axios({
        method: 'get',
        url: `https://m.search.naver.com/p/csearch/content/nqapirender.nhn?where=m&pkid=9005&key=diffV2API`,
    });
    return JSON.parse(response.data).result;
}
async function covid_live() {
    let response = await axios({
        method: 'get',
        url: `https://apiv3.corona-live.com/domestic/live.json`,
    });
    return JSON.parse(response.data);
}

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
        
        let updatetime, list, list_av, date, year;
        await naver_covid().then(function (data) {
            updatetime = data.updatetime.split('.');
            updatetime = updatetime[0] + "년 " + updatetime[1] + "월 " + updatetime[2] + "일  " + updatetime[3].split(":")[0] + "시 " + updatetime[3].split(":")[1] + "분";
            list = data.data.dailyCnt.reverse();
            list_av = data.data.average.reverse();
            date = data.data.xAxis.reverse();
            year = data.updatetime.slice(0,5);
        })

        let today;
        await covid_live().then(function (data) {
            today = data.live.today;
        })

        
        let embed = new MessageEmbed()
            .setTitle('코로나 확진자 현황')
            .setColor('#FEE75C')
            .setDescription(`어제 확진자수 업데이트시각:\n   ${updatetime}`)
            .addField(`총 확진자수(현재시간)`, today + `명`)
            .addField(`어제(` + year + date[0] + `) 확진자수`, list[0] + `명`)
            .addField(`7일 평균`, list_av[0] + `명`, true)
            .setTimestamp()
            .setFooter('Developed by sG.wolf')
        message.channel.send({ embeds: [embed] })
    }
}

