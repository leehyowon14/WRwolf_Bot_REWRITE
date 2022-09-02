const { Client, Collection } = require("discord.js");
const config = require("./config/config.json");
const bot = new Client({
        intents: 32767
    }
);
require('./util/misc.js')
bot.config = require("./config/config.json")
let token = 'OTQ2NzU3MTEwNTIyMzQ3NTgx.G4by_8.Q4ye3UKS_YxqLrn4x2p3RgUPVxhpDOV-ehRzGQ' // test bot token
global.token = token
let prefix = '!';
global.prefix = prefix;
let adminId = 935708650536845312
global.adminId = adminId

bot.authors = new Collection();
Object.values(config).forEach((x, i) => bot[Object.keys(config)[i]] = x);
["aliases", "commands"].forEach(x => bot[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

process.env.NODE_ENV = process.argv[2];

bot.login(token);
