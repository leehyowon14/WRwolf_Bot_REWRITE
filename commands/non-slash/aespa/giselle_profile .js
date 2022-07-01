const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "giselle_profile",
        aliases: [`${prefix}지젤`],
        description: "",
        usage: "",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let embed = new MessageEmbed()
            .setColor("#000000")
            .setAuthor({name: "aespa Member Profile"})
            .setThumbnail("https://cdn.discordapp.com/attachments/869082781999833118/992471823222575114/unknown.png")
            .setTitle("🌙 Giselle(지젤)-aespa")
            .addField("본명", "우치나가 애리(内永えり)\n[김애리]", true)
            .addField("국적", "🇯🇵 일본", true)
            .addField("키 / 혈액형", "163~164cm / O형", true)
            .addField("전투 능력", "Xenoglossy(빛을 다루는 통역사)")
            .setFooter({text: "2000.10.30"})
            .setTimestamp()
       message.reply({embeds: [embed]});;
    }
}