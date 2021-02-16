const Discord = require("discord.js")
const fs = require("fs")

module.exports.run = async (bot, message, args) => {

    if(!message.member.voice.channel) return message.channel.send({embed: {color: "0xFF0000", description: `❌ | 먼저 음성채널에 들어가주세요!` }})
  
    let queue = bot.player.getQueue(message.guild.id);

    if(!queue) return message.channel.send({embed: {color: "0xFF0000", description: `❌ | 현재 아무것도 재생중이지 않아요!` }})

    let q = queue.songs.map((song, i) => {
        return `${i === 0 ? 'Current' : `${i+1}`}- ${song.name} : ${song.author}`
    }).join('\n');  
       message.channel.send({embed: {color: "0x00FF46", description: `🎞️ | ${q}` }})


}

  
module.exports.config = {
  name: "대기열",
  aliases: [`${prefix}list`,`${prefix}곡목록`]
}
