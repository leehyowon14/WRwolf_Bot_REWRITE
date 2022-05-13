const winter_json = require("./json/winter.json")
let winter_array = winter_json.messages
module.exports = {
    config: {
        name: "겨울이",
        aliases: [`${prefix}winter`, `${prefix}겨울`],
        description: "겨울이 짤",
        usage: "겨울이",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if (args[0]) {
            return;
        } else if (message.channel.topic != "-짤방") {
            return;
        }

        let min = 0;
        let max = winter_array.length;
        let msg = winter_array[parseInt(Math.random() * (max - min) + min)];
        message.channel.send({ content: msg })
    }
}