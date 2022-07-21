const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const Tracking_number = require('../../../db/tracking_number')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('송장번호등록')
        .setDescription('송장 번호 설정')
        .addStringOption(option =>
            option.setName('택배사')
                .setDescription(
                    '택배사를 선택하여 주세요.'
                )
                .addChoice('CJ 대한통운', 'kr.cjlogistics')
				.addChoice('롯데택배', 'kr.lotte')
			    .addChoice('우체국 택배', 'kr.epost')
                .addChoice('GS Postbox 택배', 'kr.cvsnet')
                .addChoice('CU 편의점 택배', 'kr.cupost')
                .addChoice('한진택배', 'kr.hanjin')
                .addChoice('로젠 택배', 'kr.logen')       
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('송장번호')
              .setDescription(
                '송장번호를 입력해주세요'
              )
              .setRequired(true)
        ),

    async execute(interaction) {
        let user = await Tracking_number.findOne({user_id: id})
        if (!user) {
            user = new Tracking_number({
                user_id: id,
                org: interaction.options.get('택배사').value,
                num: interaction.options.get('송장 번호').value,
            })
            await user.save()
            let embed = new MessageEmbed()
                .setTitle('송장 등록 완료!')
                .setDescription('이제부터 "!송장"을 사용하여 송장을 조회할 수 있습니다.')
                .setColor(0x00AE86)
            return interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            await Tracking_number.findOneAndUpdate({ user_id: id }, { org: interaction.option.get("택배사").value, num: interaction.option.get("송장번호").value});
            let embed = new MessageEmbed()
                .setTitle('송장 수정 완료!')
                .setDescription('이제부터 "!송장"을 사용하여 새 송장을 조회할 수 있습니다.')
                .setColor(0x00AE86)
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}