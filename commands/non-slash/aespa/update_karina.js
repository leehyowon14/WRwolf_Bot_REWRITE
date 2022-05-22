const { MessageEmbed } = require("discord.js");
const fs = require('fs');

async function fetchAllMessages() {
    const channel = client.channels.cache.get("937378383912927302");
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
              for (let i = 0; i<[...message.attachments.values()].length; i++) {
                messages.push([...message.attachments.values()][i].url);
              }
            }
          });
  
          // Update our message pointer to be last message in page of messages
          message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
        });
    }
    console.log("get all karina picture's link successfully");
    return messages;
} //https://stackoverflow.com/questions/63322284/discord-js-get-an-array-of-all-messages-in-a-channel

module.exports = {
    config: {
        name: `${prefix}update_karina`,
        description: "get karina image",
        usage: "!update_karina",
        accessableby: "Admin",
    },
    run: async (bot, message, args) => {
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content: "너는 이 명령을 수행할 권한이 없어." })
        let msgs = fetchAllMessages()
        let obj = {"messages" : msgs}
        let json = JSON.stringify(obj);
        fs.writeFile('./json/karina.json', json);
        
        let embed = new MessageEmbed()
          .setTitle("aespa image update.")
          .setDescription(`karina's image has been updated successfully`)
          .setColor('#57F287')
        message.reply(embed)
    }
}