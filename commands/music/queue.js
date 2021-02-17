const Discord = require("discord.js")
const fs = require("fs")

module.exports.run = async (bot, message, args) => {

if(!message.member.voice.channel) return message.channel.send({embed: {color: bot.colors.error, description: `${bot.emotes.error} | 먼저 음성채널에 들어가주세요!` }})
  
let queue = bot.player.getQueue(message.guild.id);

if(!queue) return message.channel.send({embed: {color: bot.colors.error, description: `${bot.emotes.error} | 현재 아무것도 재생중이지 않아요!` }})

let q = queue.tracks.map((tracks, i) => {
    return `${i === 0 ? 'Current' : `${i+1}`}- ${tracks.name} : ${tracks.author}`
}).join('\n');  
   message.channel.send({embed: {color: bot.colors.success, description: `${bot.emotes.queue} | ${q}` }})


}
  
module.exports.config = {
  name: "queue",
  aliases: [`${prefix}list`,`${prefix}곡목록`]
}