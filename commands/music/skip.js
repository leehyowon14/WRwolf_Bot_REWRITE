const Discord = require("discord.js")
const fs = require("fs")

module.exports.run = async (bot, message, args) => {
  
  if(!message.member.voice.channel) return message.channel.send({embed: {color: "0xFF0000", description: `❌ | 먼저 음성채널에 들어가주세요!` }})
    
  if(!bot.player.isPlaying(message.guild.id)) return message.channel.send({embed: {color: "0xFF0000", description: `❌ | 현재 아무것도 재생중이지 않아요!` }})
  
  let song = await bot.player.skip(message.guild.id);

  message.channel.send({embed: {color: "0x00FF46", description: `☑️ | 재생중인 노래를 건너뛰었어요!:\n${song.name}` }})


}

module.exports.config = {
  name: "스킵",
  aliases: [`${prefix}skip`,`${prefix}다음곡`,`${prefix}s`]
}
