const { readdirSync } = require("fs")
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const rest = new REST({ version: '9' }).setToken(token);

module.exports = (bot, reload = false) => {
    const non_slash_load = dirs => {
        let dir_path = `./commands/non-slash/${dirs}/`;
        const commands = readdirSync(dir_path).filter(d => d.endsWith('.js'));
        for (let file of commands) {
            if (reload) {
                delete require.cache[require.resolve(`./${file}.js`)] // usage !reload <name>
                bot.commands.delete(file)
                let pull = require(`./${file}.js`)
                bot.commands.set(file, pull)
            } else {
                let pull = require(`../commands/non-slash/${dirs}/${file}`);
                bot.commands.set(pull.config.name, pull);
                if (pull.config.aliases) pull.config.aliases.forEach(a => bot.aliases.set(a, pull.config.name));
            }
        };
    };
    ["misc", "nsfw", "music", "mod", "meal"].forEach(x => non_slash_load(x));

    // const commands = [];
    // const slash_load = dirs => {
    //     let dir_path = `./commands/slash/${dirs}/`;
    //     const cmds = readdirSync(dir_path).filter(d => d.endsWith('.js'));
    //     console.log(cmds)
    //     for (let file of cmds) {
    //         let command = require(`../commands/slash/${dirs}/${file}`);
    //         if (Object.keys(command).length === 0) continue;
    //         bot.commands.set(command.data.name, command);
    //         commands.push(command.data.toJSON());
    //     };
    // };
    // ["meal"].forEach(x => slash_load(x));

    // (async () => {
    //     try {
    //         console.log('Started refreshing application (/) commands.');
        
    //         await rest.put(Routes.applicationCommands("870885245283631154"), {
    //           body: commands
    //         });
        
    //         console.log('Successfully reloaded application (/) commands.');
    //     } catch (error) {
    //         console.error(error);
    //     }
    // })();
};