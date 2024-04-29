const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('D-Day등록')
        .setDescription('D-Day 이벤트를 등록합니다.')
        .addStringOption(option =>
            option.setName('이름')
                .setDescription(
                    '표시될 이벤트의 이름을 입력하여 주세요.'
                )
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('날짜')
              .setDescription(
                '날짜를 입력해주세요.\nYYYY.MM.DD / 예시: 2023.01.01'
              )
              .setRequired(true)
        ),

    async execute(interaction) {
        let date = interaction.option.getString('날짜').split(".")
        if (len(date) < 3 || !date) {
            let embed = new EmbedBuilder()
                .setTitle('이벤트 등록 실패')
                .setDescription('잘못된 날짜 형식입니다.\nYYYY.MM.DD 형식으로 작성하여 주세요.\n예시: 2023.01.01')
                .setColor(0x00AE86)
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}