const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
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
                .addChoices(
                    {name:'CJ 대한통운', value: 'kr.cjlogistics'},
    				{name:'롯데택배', value: 'kr.lotte'},
	    		    {name:'우체국 택배', value: 'kr.epost'},
                    {name:'GS Postbox 택배', value: 'kr.cvsnet'},
                    {name:'CU 편의점 택배', value: 'kr.cupost'},
                    {name:'한진택배', value: 'kr.hanjin'},
                    {name: '로젠 택배', value: 'kr.logen'}
                )
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
        let user = await Tracking_number.findOne({user_id: interaction.user.id})
        if (!user) {
            user = new Tracking_number({
                user_id: interaction.user.id,
                org: interaction.options.getString('택배사'),
                num: interaction.options.getInteger('송장번호'),
            })
            await user.save()
            console.log(123)
            let embed = new EmbedBuilder()
                .setTitle('송장 등록 완료!')
                .setDescription('이제부터 "/송장"을 사용하여 송장을 조회할 수 있습니다.')
                .setColor(0x00AE86)
            return interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            await Tracking_number.findOneAndUpdate({ user_id: interaction.user.id }, { org: interaction.option.getString('택배사'), num: interaction.option.getInteger("송장번호")});
            let embed = new EmbedBuilder()
                .setTitle('송장 수정 완료!')
                .setDescription('이제부터 "/송장"을 사용하여 새 송장을 조회할 수 있습니다.')
                .setColor(0x00AE86)
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}