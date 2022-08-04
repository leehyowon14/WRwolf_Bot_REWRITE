const { EmbedBuilder } = require("discord.js");

module.exports = {
    config: {
        name: "karina_profile",
        aliases: [`${prefix}카리나`],
        description: "",
        usage: "",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let embed = new EmbedBuilder()
            .setColor("#4b81eb")
            .setAuthor({name: "aespa Member Profile"})
            .setThumbnail("https://cdn.discordapp.com/attachments/869082781999833118/992468993824788510/unknown.png")
            .setTitle("❤️ Karina(카리나)-aespa")
            .addFields(
                {name: "본명", value: "유지민", inline: true},
                {name: "국적", value: "🇰🇷 대한민국", inline: true},
                {name: "키 / 혈액형", value: "167.8cm / B형", inline: true},
                {name: "전투 능력", value:"Rocket Puncher(로켓 펀쳐)"}
            )
            .setFooter({text: "2000.04.11"})
            .setTimestamp()
       message.reply({embeds: [embed]});;
    }
}