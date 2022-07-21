module.exports = async (bot, interaction) => {
  if (interaction.isCommand()) {
    try {
      await interaction.client.commands
        .get(interaction.commandName)
        .execute(interaction);
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true
      });
    }
 }
}