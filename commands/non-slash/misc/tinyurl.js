const tinyurl = require("../../../modules/tinyurl");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    config: {
        name: "tinyurl",
        aliases: [`${prefix}tinyurl`],
        description: "",
        usage: "",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if (!args[0]) return message.channel.send("Please provide a link to shorten.");
        if (args[0].toString().slice(0, 7) != "http://" || args[0].toString().slice(0, 8) != "https://") {
            args[0] = "https://" + args[0];
        };

        tinyurl.run(args[0]).then(async (url) => {
            if (url == args[0]) url = "웹사이트 주소 단축 실패."
            let embed = new EmbedBuilder()
                .setColor("#57F287")
                .setTitle("TinyURL")
                .setDescription(`${url}`)
                .setFooter({ text: `Requested by ${message.author.tag}` })
                .setTimestamp()
            message.channel.send({ embeds: [embed] })
        });
    }
}