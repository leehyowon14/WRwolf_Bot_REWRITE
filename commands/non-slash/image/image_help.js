const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: `image_help`,
        aliases: [`${prefix}image_help`],
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if (args[0]) {
            return;
        }
        let img = "https://media1.tenor.com/images/8e341309b7d312f35f1869b2ffcaa8e8/tenor.gif?itemid=20146933"
        let embed = new MessageEmbed()
            .setColor(`#5865F2`)
            .setTitle(`울프봇 명령어`)
            .setAuthor({ name:`울프봇 짤방 도움말`, url: img })
            .addField(`\u200B`, `\u200B`)
            .addField(`${prefix}awooify/${prefix}우쭈쭈 [멘션]`, `우쭈쭈화`, true)
            .addField(`${prefix}baguette/${prefix}바게트 [멘션]`, `바게트 옴뇸뇸`, true)
            .addField(`${prefix}stickbug`, `GeT sTiCk BuGgEd LoL`, true)
            .addField(`${prefix}changemymind [영어]`, `어디 한번 바꿔보시지`, true)
            .addField(`${prefix}clyde [영어]`, `clyde가 메세지!`, true)
            .addField(`${prefix}threats/${prefix}위협 [멘션]`, `사회악`, true)
            .addField(`${prefix}trash/${prefix}쓰레기 [멘션]]`, `쓰레기 새끼`, true)
            .addField(`${prefix}trumptweet/${prefix}트럼프트윗 [영어]`, `어디 한번 바꿔보시지`, true)
            .setTimestamp()
            .setFooter({ text: `Developed by sG.wolf#5732`, iconURL: img })

        message.channel.send({ embeds: [embed] })
    }
}