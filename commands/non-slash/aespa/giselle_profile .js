const { EmbedBuilder } = require("discord.js");

module.exports = {
    config: {
        name: "giselle_profile",
        aliases: [`${prefix}지젤`],
        description: "",
        usage: "",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let embed = new EmbedBuilder()
            .setColor("#000000")
            .setAuthor({name: "aespa Member Profile"})
            .setThumbnail("https://cdn.discordapp.com/attachments/869082781999833118/992471823222575114/unknown.png")
            .setTitle("🌙 Giselle(지젤)-aespa")
            .addFields(
                {name: "본명", value: "우치나가 애리(内永えり)\n[김애리]", inline: true},
                {name: "국적", value: "🇯🇵 일본", inline: true},
                {name: "키 / 혈액형", value: "163~164cm / O형", inline: true},
                {name: "전투 능력", value: "Xenoglossy(빛을 다루는 통역사)"}
            )
            .setFooter({text: "2000.10.30"})
            .setTimestamp()
       message.reply({embeds: [embed]});;
    }
}