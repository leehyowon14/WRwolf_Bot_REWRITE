const mongoose = require("mongoose");
const { MessageEmbed } = require("discord.js");

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

    let time = getTime();
    let embed = new MessageEmbed()
        .setColor('#57F287')
        .setAuthor({ name :` ${bot.user.username} is now ONLINE!` })
        .setDescription(`${time}`)
        .setTimestamp()
        .setFooter({ text: 'Developed by sG.wolf' })
    bot.channels.cache.get("977866703998435350").send({embed: [embed]});

    mongoose.connect('mongodb+srv://WRwolf_:asdfg1010@cluster0.aaxs7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("The bot is now connected to the database!")
    }).catch((err) => {
        console.log(err)
    })
};
