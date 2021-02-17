const Discord = require("discord.js")
const fs = require("fs")

module.exports.run = async (bot, message, args) => {

if(!message.member.voice.channel) return message.channel.send({embed: {color: bot.colors.error, description: `${bot.emotes.error} | 먼저 음성채널에 들어가주세요!` }})

if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({embed: {color: bot.colors.error, description: `${bot.emotes.error} | 봇이 있는 음성채널에 있지 않아 명령을 처리할 수 없어요`}});
  
if(!bot.player.isPlaying(message.guild.id)) return message.channel.send({embed: {color: bot.colors.error, description: `${bot.emotes.error} | 먼저 음성채널에 들어가주세요!` }})

bot.player.setRepeatMode(message.guild.id, true);
 // Get the current song
 let song = await bot.player.nowPlaying(message.guild.id);
  
 message.channel.send({embed: {color: bot.colors.success, description: `${bot.emotes.repeat} | 현재 반복중인 곡 ${song.name}!` }})    
}


module.exports.config = {
  name: "loop",
  aliases: [`${prefix}repeat`,`${prefix}r`,`${prefix}반복`]
}
