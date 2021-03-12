const { readdirSync } = require("fs")

module.exports = (bot, reload = false) => {
    const load = dirs => {
        let dir_path = `./commands/${dirs}/`;
        const commands = readdirSync(dir_path).filter(d => d.endsWith('.js'));
        for (let file of commands) {
            if (reload) {
                delete require.cache[require.resolve(`./${file}.js`)] // usage !reload <name>
                bot.commands.delete(file)
                let pull = require(`./${file}.js`)
                bot.commands.set(file, pull)
            } else {
                let pull = require(`../commands/${dirs}/${file}`);
                bot.commands.set(pull.config.aliases);
            }
        };
    };
    ["misc", "mod"].forEach(x => load(x));
};