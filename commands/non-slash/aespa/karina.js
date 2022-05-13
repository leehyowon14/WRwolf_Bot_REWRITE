const karina_json = require("./json/karina.json")
let karina_array = karina_json.messages
module.exports = {
    config: {
        name: "리나",
        aliases: [`${prefix}karina`, `${prefix}리나야`],
        description: "카리나 짤",
        usage: "리나야",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if (args[0]) {
            return;
        } else if (message.channel.topic != "-짤방") {
            return;
        }

        let min = 0;
        let max = karina_array.length;
        let msg = karina_array[parseInt(Math.random() * (max - min) + min)];
        message.channel.send({ content: msg })
    }
}