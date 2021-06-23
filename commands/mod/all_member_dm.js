const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "전체공지",
        aliases: [`${prefix}공지`, `${prefix}전체공지`],
        description: "전체공지",
        usage: "전체공지 <할말>",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        if (message.member != null) {
            let guild_name =  message.guild.name()
            let embed = new MessageEmbed()
                .setAuthor(`📢공지 by ${guild_name}`)
                .setColor("#186de6")
                .setFooter(`울프봇.`)
                .setTimestamp()
      
            embed.addField("공지: ", contents)
      
            message.member.guild.members.cache.array().forEach((x) => {
              if (x.user.bot) return
              x.user.send(embed)
            })
      
            return message.reply("공지를 전송했습니다.")
          } else {
            return message.reply("채널에서 실행해주세요.")
          }
    }
}