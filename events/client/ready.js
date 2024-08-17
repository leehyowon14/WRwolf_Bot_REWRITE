const mongoose = require("mongoose");
const { EmbedBuilder } = require("discord.js");
const Poll = require('../../db/poll');

module.exports = async bot => {
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
    let embed = new EmbedBuilder()
        .setColor('#57F287')
        .setAuthor({ name :` ${bot.user.username} is now ONLINE!` })
        .setDescription(`${time}`)
        .setTimestamp()
        .setFooter({ text: 'Developed by Wonny._.lee' })
    bot.channels.cache.get("977866703998435350").send({embeds: [embed]});

    mongoose.connect('mongodb+srv://WRwolf_:asdfg1010@cluster0.aaxs7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("The bot is now connected to the database!")
    }).catch((err) => {
        console.log(err)
    }) 

    // 기존 poll 데이터 불러오기 
    let polls = await Poll.find();
    for (let poll of polls) {
        let channel = await bot.channels.fetch(poll.poll_id.split('-')[0]);
        let message = await channel.messages.fetch(poll.poll_id.split('-')[1]);
        
        // 투표 종료 시간이 지난 경우 결과 출력 후 DB에서 삭제
        if (poll.end_date < Date.now()) {
            let reaction = [...message.reactions.cache.values()];
            let result = await get_result(reaction);
            message.edit({content: result});
            await Poll.deleteOne({ poll_id: poll.poll_id });
        } 
        // 투표가 진행 중인 경우 타이머 재설정
        else {
            setTimeout(async function() {
                let reaction = [...message.reactions.cache.values()];
                let result = await get_result(reaction);
                message.edit({content: result});
                await Poll.deleteOne({ poll_id: poll.poll_id });
            }, poll.end_date - Date.now());
        }

        async function get_result(reaction) {
            let result = '투표가 종료되었습니다 \n\n결과'
            let len = reaction.length
            let vote_count
            let skipped = 0
            for (let i = 1; i < len + 1; i++) {
                if (reaction[i-1].me){
                    let reac = await reaction[i-1].fetch()
                    vote_count = reac.count - 1
                    result += `\n   ${i-skipped}번: ${vote_count}명`
                } else {
                    skipped += 1
                }
            }
            return result
        }
    }
};