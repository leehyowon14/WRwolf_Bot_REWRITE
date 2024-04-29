const axios = require('axios');
const { EmbedBuilder } = require("discord.js");


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
            let embed = new EmbedBuilder()
                .setColor('#ED4245')
                .setAuthor({ name: '에러!'})
                .setTitle('검색할 유저의 닉네임을 입력하여주세요')
                .setTimestamp()
                .setFooter({text: 'Developed by Wonny._.lee#5732'})
            message.channel.send({ embeds: [embed] })
            return;
        }

        axios.get(`https://eintim.one/ridapi.php?username=${encodeURIComponent(search)}`)
            .then(function (response) {
                data = response.data
                if (!data) {
                    let embed = new EmbedBuilder()
                        .setColor('#ED4245')
                        .setAuthor({ name :`Search results for "${search}"` })
                        .addFields({name: "Error", value: `System Error`})
                        .setTimestamp()
                        .setFooter({ text: 'Developed by Wonny._.lee' })
                    message.channel.send({ embeds: [embed] })
                    return
                }
                let embed = new EmbedBuilder()
                    .setColor('#57F287')
                    .setAuthor({ name: `${search}'s SCID` })
                    .addFields({name: "SCID", value: `${data}`})
                    .setThumbnail(`https://prod.cloud.rockstargames.com/members/sc/8501/${data}/publish/gta5/mpchars/0.png`)
                    .setTimestamp()
                    .setFooter({ text: 'Developed by Wonny._.lee' })
                message.channel.send({ embeds: [embed] })
            console.log(response);
            })
            .catch(function (error) {
                let embed = new EmbedBuilder()
                    .setColor('#ED4245')
                    .setAuthor({ name :`Search results for "${search}"` })
                    .addFields({name: "Error", value: `System Error`})
                    .setTimestamp()
                    .setFooter({ text: 'Developed by Wonny._.lee' })
                message.channel.send({ embeds: [embed] })
                console.log(error);
            })
    }
}