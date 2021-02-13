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
}
