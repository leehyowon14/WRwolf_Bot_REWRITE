module.exports = bot => {
    let activities = [
        `${bot.guilds.cache.size} servers!`,
        `${bot.channels.cache.size} channels!`,
        `${bot.users.cache.size} users!`,
        `버그제보는 봇 DM으로!`
    ];
    let i = 0;
    setInterval(() => bot.user.setActivity(`${prefix}help | ${activities[i++ % activities.length]}`, { type: "WATCHING" }), 5000)

    log(`${redChalk(bot.user.username)} ${greenChalk('is online')}`);
};
