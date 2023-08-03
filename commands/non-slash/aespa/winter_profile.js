const { EmbedBuilder } = require("discord.js");

module.exports = {
    config: {
        name: "winter_profile",
        aliases: [`${prefix}윈터`],
        description: "",
        usage: "",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let embed = new EmbedBuilder()
            .setColor("#FEE75C")
            .setAuthor({name: "aespa Member Profile"})
            .setThumbnail("https://cdn.discordapp.com/attachments/869082781999833118/992467130048065566/unknown.png")
            .setTitle("⭐ Winter(윈터)-aespa")
            .addFields(
                {name:"본명", value:"김민정", inline: true},
                {name:"국적", value:"🇰🇷 대한민국", inline: true},
                {name:"키 / 혈액형 / 발사이즈", value:"164cm / A / 225mm", inline: true},
                {name:"전투 능력", value:"Armamenter(무기 능력자)"},
            )
            .setFooter({text: "2001.01.01"})
            .setTimestamp()
        message.reply({embeds: [embed]});
    }
}