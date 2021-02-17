const { Util } = require("discord.js")
const fs = require("fs")

module.exports.run = async (bot, message, args) => {

if (!message.member.voice.channel) return message.channel.send({embed: {color: bot.colors.error, description: `${bot.emotes.error} | 먼저 음성채널에 들어가주세요!`}});
  
if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({embed: {color: bot.colors.error, description: `${bot.emotes.error} | 봇이 있는 음성채널에 있지 않아 명령을 처리할 수 없어요`}});

let query = args.join(" ");
if (!query) return message.channel.send({embed: {color: bot.colors.error, description: `${bot.emotes.error} | 검색어 혹은 링크를 입력해주세요!` }})

const searchTracks = await bot.player.searchTracks(query).catch(e => {
  return message.channel.send({embed: {color: bot.colors.error, description: `${bot.emotes.error} | 결과없음!`}})
});

if(searchTracks.length < 1) return message.channel.send({embed: {color: bot.colors.error, description: `${bot.emotes.error} | 결과없음!`}})
  
let track = searchTracks[0];


if(bot.player.isPlaying(message.guild.id)){
    // Add the song to the queue
    let song = await bot.player.addToQueue(message.guild.id, track, message.member.user.tag);
   return message.channel.send({embed: {color: bot.colors.success, description: `${bot.emotes.success} | ${Util.escapeMarkdown(song.name)} by ${Util.escapeMarkdown(song.author)} 을/(를) 대기열에 추가했어요` }})
} else {
    // Else, play the song
    let song = await bot.player.play(message.member.voice.channel, track, message.member.user.tag);
    message.channel.send({embed: {color: bot.colors.success, description: `${bot.emotes.music} | 현재 재생중인 곡:\n${song.name}` }})
    bot.player.getQueue(message.guild.id).on('end', () => {
    message.channel.send({embed: {color: bot.colors.warning, description: `${bot.emotes.warning} | 대기열이 비었어요!, 노래를 더 추가해주세요!` }})
    });

    bot.player.getQueue(message.guild.id).on('trackChanged', (oldSong, newSong, skipped, repeatMode) => {
        if(repeatMode){
            message.channel.send({embed: {color: bot.colors.success, description: `${bot.emotes.repeat} | 현재 반복중인 곡:\n ${oldSong.name}` }})
        } else {
            message.channel.send({embed: {color: bot.colors.success, description: `${bot.emotes.music} | 현재 재생중인 곡:\n ${newSong.name}` }})
        }
    });
}
}

module.exports.config = {
  name: "play",
  aliases: [`${prefix}p`,`${prefix}play`,`${prefix}재생`]
}
