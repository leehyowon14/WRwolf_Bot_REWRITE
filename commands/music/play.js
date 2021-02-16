const Discord = require("discord.js")
const fs = require("fs")

module.exports.run = async (bot, message, args) => {
let queue = args.join(" ");
if (!queue) return message.channel.send({embed: {color: '#f94343', description: `❌ | Please enter a query to search!` }})

let playing = bot.player.isPlaying(message.guild.id);

if(playing){
    // Add the song to the queue
    let song = await bot.player.addToQueue(message.guild.id, queue, message.member.user.tag);
    message.channel.send({embed: {color: "#ace9e7", description: `☑️ | ${song.name} 을/(를) 대기열에 추가했어요` }})
} else {
    // Else, play the song
    let song = await bot.player.play(message.member.voice.channel, queue, message.member.user.tag);
    message.channel.send({embed: {color: "0x00FF46", description: `🎶 | 현재 재생중인 곡:\n${song.name}` }})
    song.queue.on('end', () => {
    message.channel.send({embed: {color: "0xFFD100", description: `⚠️ | 대기열이 비었어요!, 노래를 더 추가해주세요` }})
    });

    song.queue.on('songChanged', (oldSong, newSong, skipped, repeatMode) => {
        if(repeatMode){
            message.channel.send({embed: {color: "0x00FF46", description: `🔁 | 현재 반복중인 곡:\n ${oldSong.name}` }})
        } else {
            message.channel.send({embed: {color: "0x00FF46", description: `🎶 | 현재 재생중인 곡:\n ${newSong.name}` }})
        }
    });
}
}
  
module.exports.config = {
  name: "재생",
  aliases: [`${prefix}p`,`${prefix}play`,`${prefix}재생`]
}
