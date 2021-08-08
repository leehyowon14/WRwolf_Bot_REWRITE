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
    let url = "https://apiv2.corona-live.com/stats.json"
    request(url, (error, response, body) => {
    let overview = JSON.parse(response.body).overview;
    overview = {
        total_confirmed_person: overview.confirmed[0], // 총 확진자수
        yesterday_confirmed_person: overview.confirmed[1], // 어제 확진자수

        current_confirmed_person: overview.current[0], // 현재 확진자수
        current_confirmed_person_diff: overview.current[1], // diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
    }

    let current = JSON.parse(response.body).current;
    current = {
        gyeongbuk_confirmed_person: current[12].cases[0],//경북 현재 확진자 수
        gyeongbuk_confirmed_person_diff: current[12].cases[1],//경북 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
    }

    let overall = JSON.parse(response.body).overall;
    overall = {
        gyeongbuk_total_confirmed_person: overall[12].cases[0], // 경북 총 확진자수
        gyeongbuk_yesterday_confirmed_person: overall[12].cases[1], // 경북 어제 확진자수
    }

    let embed = new MessageEmbed()
        .setTitle('코로나')
        .setURL('https://corona-live.com')
        .setColor('#FF8000')
        .setDescription('증상이 있으실 경우 주변 접촉자에게 알리신 후 인근 보건소를 찾아주시기 바랍니다')
        .addField(`대한민국 총 확진자수`, `${overview.total_confirmed_person}명`, true)
        .addField(`어제 확진자수`, overview.yesterday_confirmed_person + `명`, true)
        .addField(`오늘 확진자수(집계중)`, overview.current_confirmed_person + `명`, true)
        .addField(`오늘 어제지금시간   -   현재지금시간의 확진자`, overview.current_confirmed_person_diff + `명`, true)
        .addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
    let embed4 = new MessageEmbed()
        .setColor('#FF8000')
        .addField(`경북` ,'ㅤ')
        .addField(`경북 총 확진자수`,  overall.gyeongbuk_total_confirmed_person + `명`, true)
        .addField(`경북 어제 확진자수`, overall.gyeongbuk_yesterday_confirmed_person + `명`, true)
        .addField(`경북 현재 확진자 수(집계중)`, current.gyeongbuk_confirmed_person + `명`, true)
        .addField(`경북 어제  지금시간   -   현재지금시간의 확진자`, current.gyeongbuk_confirmed_person_diff + `명`,true)
        .addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
        message.channel.send({ embeds: [embed, embed4] })
  })
    }
}

