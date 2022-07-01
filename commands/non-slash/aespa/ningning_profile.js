const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "ningning_profile",
        aliases: [`${prefix}닝닝`],
        description: "",
        usage: "",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let embed = new MessageEmbed()
            .setColor("#a93fff")
            .setAuthor({name: "aespa Member Profile"})
            .setThumbnail("https://cdn.discordapp.com/attachments/869082781999833118/992470199070625834/unknown.png")
            .setTitle("🦋NingNing(닝닝)-aespa")
            .addField("본명", "닝이줘(宁艺卓)", true)
            .addField("국적", "🇨🇳 중국", true)
            .addField("키 / 혈액형", "161cm / O형", true)
            .addField("전투 능력", "E.d Hacker( 해커[E.d 소속] )")
            .setFooter({text: "2002.10.23"})
            .setTimestamp()
       message.reply({embeds: [embed]});;
    }
}