const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "karina_profile",
        aliases: [`${prefix}카리나`],
        description: "",
        usage: "",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let embed = new MessageEmbed()
            .setColor("#4b81eb")
            .setAuthor({name: "aespa Member Profile"})
            .setThumbnail("https://cdn.discordapp.com/attachments/869082781999833118/992468993824788510/unknown.png")
            .setTitle("❤️ Karina(카리나)-aespa")
            .addField("본명", "유지민", true)
            .addField("국적", "🇰🇷 대한민국", true)
            .addField("키 / 혈액형", "167.8cm / B형", true)
            .addField("전투 능력", "Rocket Puncher(로켓 펀쳐)")
            .setFooter({text: "2000.04.11"})
            .setTimestamp()
       message.reply({embeds: [embed]});;
    }
}