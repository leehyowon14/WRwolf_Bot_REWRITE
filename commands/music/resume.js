const Discord = require("discord.js")
const fs = require("fs")

module.exports.run = async (bot, message, args) => {

if(!message.member.voice.channel) return message.channel.send({embed: {color: bot.colors.error, description: `${bot.emotes.error} | 먼저 음성채널에 들어가주세요!` }})
    
if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({embed: {color: bot.colors.error, description: `${bot.emotes.error} | 봇이 있는 음성채널에 있지 않아 명령을 처리할 수 없어요!`}});


if(!bot.player.isPlaying(message.guild.id)) return message.channel.send({embed: {color: bot.colors.error, description: `${bot.emotes.error} | 현재 아무것도 재생중이지 않아요!!` }})

let song = await bot.player.resume(message.guild.id);
          
return message.channel.send({embed: {color: bot.colors.success, description: `${bot.emotes.resume} | 일시정지했던 노래를 다시 틀었어요!` }});
  
}

module.exports.config = {
  name: "resume",
  aliases: [`${prefix}resume`,`${prefix}재생`]
}
