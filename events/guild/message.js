const adminUserId = 745859722720051234;

module.exports = async (bot, message) => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") {
        if(message.author.id == adminUserId) return;

        let msg = `${message.author}이(가) 메세지를 보냈습니다.\n${message.content}`;
        bot.users.cache.find(x => x.id == adminUserId).send(msg)

        return;
    }
    let args = message.content.slice(bot.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if (commandfile) {
        commandfile.run(bot, message, args)
    }
    //distube 음악
const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
bot.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `${bot.emotes.play} | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `${bot.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `${bot.emotes.play} | Play \`${playlist.title}\` playlist (${playlist.total_items} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `${bot.emotes.success} | Added \`${playlist.title}\` playlist (${playlist.total_items} songs) to queue\n${status(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", message => message.channel.send(`${bot.emotes.error} | Searching canceled`))
    .on("error", (message, err) => message.channel.send(`${bot.emotes.error} | An error encountered: ${err}`))


}
