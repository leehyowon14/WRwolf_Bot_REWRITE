const Discord = require("discord.js")
const fs = require("fs")

module.exports.run = async (bot, message, args) => {
  
if(!message.member.voice.channel) return message.channel.send({embed: {color: "0xFF0000", description: `❌ | 먼저 음성채널에 들어가주세요!` }})
if(!bot.player.isPlaying(message.guild.id)) return message.channel.send({embed: {color: "0xFF0000", description: `❌ | 먼저 음성채널에 들어가주세요!` }})

bot.player.setRepeatMode(message.guild.id, true);
 // Get the current song
 let song = await bot.player.nowPlaying(message.guild.id);
  
 message.channel.send({embed: {color: "0x00FF46", description: `🔁 | 현재 반복중인 곡: ${song.name}!` }})    
}

module.exports.config = {
  name: "반복",
  aliases: [`${prefix}repeat`,`${prefix}r`,`${prefix}반복`]
}
