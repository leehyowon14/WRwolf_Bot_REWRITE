const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { readFileSync } = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('메뉴추천')
        .setDescription('메뉴를 추천해드립니다.'),
    async execute(interaction) {
        const foodTypes = ['한식', '양식', '중식', '일식'];
        const spicyTypes = ['매운 음식', '안 매운 음식'];
        const tempTypes = ['뜨거운 음식', '차가운 음식'];

        const selectedOptions = [];

        const foodTypeRow = new ActionRowBuilder()
            .addComponents(
                foodTypes.map(type => new ButtonBuilder()
                    .setCustomId(type)
                    .setLabel(type)
                    .setStyle(ButtonStyle.Primary)
                )
            );

        const initialEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('메뉴 추천')
            .setDescription('어떤 종류의 음식을 드시고 싶으신가요?');

        await interaction.reply({ embeds: [initialEmbed], components: [foodTypeRow] });

        const foodTypeCollector = interaction.channel.createMessageComponentCollector({
            filter: i => i.user.id === interaction.user.id,
            time: 15000
        });

        foodTypeCollector.on('collect', async i => {
            selectedOptions.push(i.customId);
            await i.deferUpdate();

            if (selectedOptions.length === 1) {
                const spicyTypeRow = new ActionRowBuilder()
                    .addComponents(
                        spicyTypes.map(type => new ButtonBuilder()
                            .setCustomId(type)
                            .setLabel(type)
                            .setStyle(ButtonStyle.Primary)
                        )
                    );

                const spicyEmbed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('메뉴 추천')
                    .setDescription('매운 음식을 좋아하시나요?');

                await interaction.editReply({ embeds: [spicyEmbed], components: [spicyTypeRow] });
            } else if (selectedOptions.length === 2) {
                const tempTypeRow = new ActionRowBuilder()
                    .addComponents(
                        tempTypes.map(type => new ButtonBuilder()
                            .setCustomId(type)
                            .setLabel(type)
                            .setStyle(ButtonStyle.Primary)
                        )
                    );

                const tempEmbed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('메뉴 추천')
                    .setDescription('뜨거운 음식과 차가운 음식 중 어떤 것을 선호하시나요?');

                await interaction.editReply({ embeds: [tempEmbed], components: [tempTypeRow] });
            } else if (selectedOptions.length === 3) {
                const suggestedMeal = getSuggestedMeal(selectedOptions);

                const finalEmbed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('메뉴 추천 결과')
                    .addFields(
                        { name: '선택한 옵션', value: selectedOptions.join(', ') },
                        { name: '추천 메뉴', value: suggestedMeal }
                    );

                await interaction.editReply({ embeds: [finalEmbed], components: [] });
                foodTypeCollector.stop();
            }
        });
    },
};

function getSuggestedMeal(selectedOptions) {
    let [foodType, spicyType, tempType] = selectedOptions;
    spicyType = spicyType === '매운 음식' ? 1 : 0;
    tempType = tempType === '뜨거운 음식' ? 1 : 0;
    console.log(10)
    let food = JSON.parse(readFileSync('./commands/slash/meal/JSON/food.json', 'utf-8'));
    food = food.filter(f => f.category == foodType);
    food = food.filter(f => f.isSpicy == spicyType);
    food = food.filter(f => f.isHot == tempType);
    food = food[parseInt(Math.random() * food.length)];
    console.log(food)
    return food.name;
}
