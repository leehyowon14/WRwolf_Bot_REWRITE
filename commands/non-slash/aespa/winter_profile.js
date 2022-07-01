const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "winter_profile",
        aliases: [`${prefix}윈터`],
        description: "",
        usage: "",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let embed = new MessageEmbed()
            .setColor("#FEE75C")
            .setAuthor({name: "aespa Member Profile"})
            .setThumbnail("https://cdn.discordapp.com/attachments/869082781999833118/992467130048065566/unknown.png")
            .setTitle("⭐ Winter(윈터)-aespa")
            .addField("본명", "김민정", true)
            .addField("국적", "🇰🇷 대한민국", true)
            .addField("키 / 혈액형 / 발사이즈", "164cm / A / 225mm", true)
            .addField("전투 능력", "Armamenter(무기 능력자)")
            .setFooter({text: "2000.01.01"})
            .setTimestamp()
        message.reply({embeds: [embed]});
    }
}