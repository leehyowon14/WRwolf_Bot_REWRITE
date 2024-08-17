const { EmbedBuilder } = require('discord.js');

module.exports = async (bot, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = bot.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        const errorEmbed = new EmbedBuilder()
            .setColor('Red')
            .setTitle('에러가 발생했습니다!')
            .setDescription(`${error.message}`);
        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}