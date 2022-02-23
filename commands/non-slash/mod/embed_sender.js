const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "send_embed",
        aliases: [`${prefix}embed`],
        description: "send embed",
        usage: "embed [Title], [Description], [Color], [Footer]",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content: "너는 이 명령을 수행할 권한이 없어." })
        let arg = args.join(" ");
        arg = arg.split(",");
        //create MessageEmbed and send it to channel. discord.js v13 (Written with Copilot)
        function sendEmbed(channel, title, description, color, footer) {
            let embed1 = new MessageEmbed()
                .setTitle(title)
                .setDescription(description)
                .setColor(color)
                .setTimestamp()
                .setFooter(footer)
            channel.send({ embeds: [embed1] })
        }
        if (arg[0] && arg[1] && arg[2] && arg[3]) {
            sendEmbed(message.channel, arg[0], arg[1], arg[2], arg[3])
        }
    }
}
