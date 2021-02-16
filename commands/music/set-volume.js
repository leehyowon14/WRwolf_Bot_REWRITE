const Discord = require("discord.js")
const fs = require("fs")

module.exports.run = async (bot, message, args) => {

  if(!message.member.voice.channel) return message.channel.send({embed: {color: "0xFF0000", description: `❌ | 먼저 음성채널에 들어가주세요!` }})
    
  if(!bot.player.isPlaying(message.guild.id)) return message.channel.send({embed: {color: "0xFF0000", description: `❌ | 현재 아무것도 재생중이지 않아요!` }})
  let volume = parseInt(args.join(" "));
  if (!volume) return message.channel.send({embed: {color: "0xFF0000", description: `❌ | 숫자만 입력해주세요!` }})
  if (isNaN(args[0])) return message.channel.send({embed: {color: "0xFF0000", description: `❌ | 유효한 숫자만 입력해주세요!` }})
  
  bot.player.setVolume(message.guild.id, volume);
    
  message.channel.send({embed: {color: "0x00FF46", description: `☑️ | 볼륨 설정됨 : \`${args.join(" ")}\` ` }})


}

module.exports.config = {
  name: "볼륨",
  aliases: [`${prefix}v`,`${prefix}volume`,`${prefix}불륨`]
}
