const sp_search = require("./function/search.js");

module.exports = {
    config: {
        name: `searchmusic`,
        aliases: [`${prefix}spotify`],
        description: "스포티파이 음악 검색",
        usage: "!spotify [song name]",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let search = args.join(' ')
        sp_search.run(search, message)
    }
}