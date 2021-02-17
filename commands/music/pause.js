const Discord = require("discord.js")
const fs = require("fs")

module.exports.run = async (bot, message, args) => {

if(!message.member.voice.channel) return message.channel.send({embed: {color: bot.colors.error, description: `${bot.emotes.error} | 먼저 음성채널에 들어가주세요!` }})
    
if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({embed: {color: bot.colors.error, description: `${bot.emotes.error} | 봇이 있는 음성채널에 있지 않아 명령을 처리할 수 없어요`}});

if(!bot.player.isPlaying(message.guild.id)) return message.channel.send({embed: {color: bot.colors.error, description: `${bot.emotes.error} | 현재 아무것도 재생중이지 않아요!` }})

let song = await bot.player.pause(message.guild.id);
          
return message.channel.send({embed: {color: bot.colors.success, description: `${bot.emotes.pause} | 재생중인 곡을 일시정지 했어요` }});
  
}

module.exports.config = {
  name: "pause",
  aliases: [`${prefix}pause`, `${prefix}일지정지`]
}
