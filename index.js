const { Client, Collection, Intents } = require("discord.js");
const config = require("./config/config.json");
const bot = new Client({
        intents: new Intents([
            'GUILDS',
            'GUILD_MEMBERS',
            'GUILD_BANS',
            'GUILD_EMOJIS_AND_STICKERS',
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
);
require('./util/misc.js')
bot.config = require("./config/config.json")
let token = process.env.token
global.token = token
let prefix = process.env.prefix;
global.prefix = prefix;
let adminId = 935708650536845312
global.adminId = adminId

bot.authors = new Collection();
Object.values(config).forEach((x, i) => bot[Object.keys(config)[i]] = x);
["aliases", "commands"].forEach(x => bot[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

process.env.NODE_ENV = process.argv[2];

bot.login(token);
