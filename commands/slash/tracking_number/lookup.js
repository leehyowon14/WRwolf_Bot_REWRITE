const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const Tracking_number = require('../../../db/tracking_number')
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('송장')
        .setDescription('송장 번호 조회'),

    async execute(interaction) {
        let user = await Tracking_number.findOne({user_id: interaction.user.id})
        if (!user) {
            let embed = new MessageEmbed()
                .setTitle('등록된 송장 없음!')
                .setDescription('"/송장번호등록"을 사용하여 송장을 등록한 후에 이용해 주세요')
                .setColor(0x00AE86)
            return interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            let response = await axios({
                method: 'get',
                url: `https://apis.tracker.delivery/carriers/${user.org}/tracks/${user.num}/`,
            });
            if (response.status !== 200) return interaction.reply({content:"api 서버 오류", ephemeral: true});
            if (!response.data.message) {
                let data = response.data
                let progresses = data.progresses[0]
                let date = progresses.time.slice(0, 16).split('T')
                date = date[0].split('-').concat(date[1].split(':'))
                data = date[0]+'년 '+date[1]+'월 '+date[2]+'일 '+date[3]+'시 '+date[4]+'분'
                console.log(data)
                let carrier_name = data.carrier.name
                let embed = new MessageEmbed()
                    .setTitle("조회 성공")
                    .setColor(0x00AE86)
                    .setAuthor({name:`송장: ${carrier_name} ${user.num}`})
                    .setDescription(`단계: ${data.state.text}\n${data.from.name} -> ${data.to.name}\n\n마지막 활동: [${date}] ${progress.status.text} 상세정보:    ${progresses.description}`)
                
                /*
                단계: data.state.text
                data.from.name -> data.to.name

                마지막 활동: [date] progress.status.text
                상세정보:    progresses.description
                */
                interaction.reply({ embeds: [embed], ephemeral: true });
            } else {
                let embed = new MessageEmbed()
                    .setTitle('조회 실패')
                    .setDescription(response.data.message + `\n(오류가 지속될 경우송장번호가 올바른지 확인하여 주세요)`)
                    .setColor(0x00AE86)
                interaction.reply({ embeds: [embed], ephemeral: true });
            }
        }
    }
}