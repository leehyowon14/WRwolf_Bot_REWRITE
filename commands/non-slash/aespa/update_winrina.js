const { MessageEmbed } = require("discord.js");
const fs = require('fs');

async function fetchAllMessages(bot) {
  const channel = bot.channels.cache.get("942763190104752158");
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
  console.log("get all winrina picture's link successfully");
  return messages;
} //https://stackoverflow.com/questions/63322284/discord-js-get-an-array-of-all-messages-in-a-channel

module.exports = {
    config: {
        name: `${prefix}update_winrina`,
        description: "get winrina image",
        usage: "!update_winrina",
        accessableby: "Admin",
    },
    run: async (bot, message, args) => {
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content: "너는 이 명령을 수행할 권한이 없어." })
        fetchAllMessages(bot).then(msgs => {
          let obj = {"messages" : msgs}
          let json = JSON.stringify(obj);
          fs.writeFile('./commands/non-slash/aespa/json/winrina.json', json, 'utf-8', function(error) {
            console.log('write end!');
          });
        })
        
        let embed = new MessageEmbed()
          .setTitle("aespa image update.")
          .setDescription(`winrina's image has been updated successfully`)
          .setColor('#57F287')
        message.reply({ embeds: [embed] })
    }
}