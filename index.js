const { Client, Collection, Intents } = require("discord.js");
const config = require("./config/config.json");
const bot = new Client({
    ws: {
        intents: new Intents(['GUILDS',
            'GUILD_MEMBERS',
            'GUILD_BANS',
            'GUILD_EMOJIS',
            'GUILD_INTEGRATIONS',
            'GUILD_WEBHOOKS',
            'GUILD_INVITES',
            'GUILD_VOICE_STATES',
            'GUILD_PRESENCES',
            'GUILD_MESSAGES',
            'GUILD_MESSAGE_REACTIONS',
            'GUILD_MESSAGE_TYPING',
            'DIRECT_MESSAGES',
            'DIRECT_MESSAGE_REACTIONS',
            'DIRECT_MESSAGE_TYPING'])
    }
});
require('./util/misc.js')
const yaml = require('js-yaml');
const fs = require('fs');
const DisTube = require("distube")
bot.config = require("./config/config.json")
bot.distube = new DisTube(bot, { searchSongs: true, emitNewSongOnly: true, leaveOnFinish: true })
bot.commands = new Collection()
bot.aliases = new Collection()
bot.emotes = config.emotes

let prefix = process.env.prefix;
global.prefix = prefix;

try {
    const doc = yaml.safeLoad(fs.readFileSync('./config/config.yml', 'utf8'));
    // console.log({doc});
    console.log(doc.commands.misc);
    console.log(doc.commands.mod);
    // console.log(doc['url path']);
    // console.log(doc['title']);
    // console.log(doc.title);
} catch (e) {
    console.log(e);
}

bot.authors = new Collection();
Object.values(config).forEach((x, i) => bot[Object.keys(config)[i]] = x);
["aliases", "commands"].forEach(x => bot[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

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


process.env.NODE_ENV = process.argv[2];

bot.login(process.env.token);
