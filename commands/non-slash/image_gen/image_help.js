const { EmbedBuilder } = require("discord.js");

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
        let embed = new EmbedBuilder()
            .setColor(`#5865F2`)
            .setTitle(`울프봇 명령어`)
            .setAuthor({ name:`울프봇 짤방 도움말`, url: img })
            .addFields(
                {name: `\u200B`, value: `\u200B`},
                {name: `${prefix}awooify/${prefix}우쭈쭈 [멘션]`, value: `우쭈쭈화`, inline: true},
                {name: `${prefix}baguette/${prefix}바게트 [멘션]`, value: `바게트 옴뇸뇸`, inline: true},
                {name: `${prefix}stickbug`, value: `GeT sTiCk BuGgEd LoL`, inline: true},
                {name: `${prefix}changemymind [영어]`, value: `어디 한번 바꿔보시지`, inline: true},
                {name: `${prefix}clyde [영어]`, value: `clyde가 메세지!`, inline: true},
                {name: `${prefix}threats/${prefix}위협 [멘션]`, value: `사회악`, inline: true},
                {name: `${prefix}trash/${prefix}쓰레기 [멘션]]`, value: `쓰레기 새끼`, inline: true},
                {name: `${prefix}trumptweet/${prefix}트럼프트윗 [영어]`, value: `어디 한번 바꿔보시지`, inline: true}
            )
            .setTimestamp()
            .setFooter({ text: `Developed by sG.wolf#5732`, iconURL: img })

        message.channel.send({ embeds: [embed] })
    }
}