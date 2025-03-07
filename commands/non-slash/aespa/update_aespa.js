const { EmbedBuilder } = require("discord.js");
const fs = require('fs');

async function fetchAllMessages(bot) {
  const channel = bot.channels.cache.get("927518499788718100");
  let messages = [];

  // Create message pointer
  let message = await channel.messages
    .fetch({ limit: 1 })
    .then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null));

  while (message) {
    await channel.messages
      .fetch({ limit: 100, before: message.id })
      .then(messagePage => {
        messagePage.forEach(msg => {
          if ([...msg.attachments.values()].length > 0) {
            for (let i = 0; i<[...msg.attachments.values()].length; i++) {
              messages.push([...msg.attachments.values()][i].url);
            }
          }
        });

        // Update our message pointer to be last message in page of messages
        message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
      });
  }
  console.log("get all aespa picture's link successfully");
  return messages;
} //https://stackoverflow.com/questions/63322284/discord-js-get-an-array-of-all-messages-in-a-channel

module.exports = {
    config: {
        name: `${prefix}update_aespa`,
        description: "get aespa image",
        usage: "!update_aespa",
        accessableby: "Admin",
    },
    run: async (bot, message, args) => {
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content: "너는 이 명령을 수행할 권한이 없어." })
        let msgs = await fetchAllMessages(bot)
        
        let obj = { "messages": msgs }
        let json = JSON.stringify(obj);
        await fs.writeFile('./commands/non-slash/aespa/json/aespa.json', json, 'utf-8', function(error) {
          console.log('write end!');
        });
      
        let embed = new EmbedBuilder()
            .setTitle("aespa image update.")
            .setDescription(`aespa's image has been updated successfully`)
            .setColor('#57F287')
        message.reply({ embeds: [embed] })
    }
}