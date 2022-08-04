const { Client, GatewayIntentBits, Partials } = require("discord.js");
const config = require("./config/config.json");
const bot = new Client({
        intents: new IntentsBitField(32767)
    }
);
require('./util/misc.js')
bot.config = require("./config/config.json")
let token = 'OTQ2NjMwMzIwNzM4OTUxMjQ4.YhhgMA.e6g-qavPWVhEnfTG_2j6fuNNd8M'
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
