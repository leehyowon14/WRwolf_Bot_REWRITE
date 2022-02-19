const request = require("request")
const { MessageEmbed } = require("discord.js");

async function get_data(url, message) {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            console.log(url)
            if (!body) {
                let embed = new MessageEmbed()
                    .setColor('#ED4245')
                    .setAuthor(`Error`)
                    .addField("Error", `body is undefinded`)
                    .setTimestamp()
                    .setFooter('Developed by sG.wolf')
                message.channel.send({ embeds: [embed] })
                return reject(console.log(body))
            }
            resolve(body)
        })
    })
}

module.exports = {
    config: {
        name: `scid`,
        aliases: [`${prefix}scid`, `${prefix}rid`],
        description: "SCID 검색",
        usage: "!scid [username]",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let search = args[0]
        if (!search) {
            let embed = new MessageEmbed()
                .setColor('#ED4245')
                .setAuthor('에러!')
                .setTitle('검색할 유저의 닉네임을 입력하여주세요')
                .setTimestamp()
                .setFooter('Developed by sG.wolf#7777')
            message.channel.send({ embeds: [embed] })
            return;
        }
        let url = `https://eintim.one/ridapi.php?username=${encodeURIComponent(search)}`
        await get_data(url, message).then(function (v) {
            data = v
        })
            if (!data) {
                let embed = new MessageEmbed()
                    .setColor('#ED4245')
                    .setAuthor(`Search results for "${search}"`)
                    .addField("Error", `System Error`)
                    .setTimestamp()
                    .setFooter('Developed by sG.wolf')
                message.channel.send({ embeds: [embed] })
                return
            }
            let embed = new MessageEmbed()
                .setColor('#57F287')
                .setAuthor(`${search}'s SCID`)
                .addField("SCID", `${data}`)
                .setThumbnail(`https://prod.cloud.rockstargames.com/members/sc/8501/${data}/publish/gta5/mpchars/0.png`)
                .setTimestamp()
                .setFooter('Developed by sG.wolf')
            message.channel.send({ embeds: [embed] })
        
        
    }
}