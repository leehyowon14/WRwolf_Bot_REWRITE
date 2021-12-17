const moment = require('moment-timezone');
const forbiddenWord = require('../../util/forbiddenWord.json');
const GuildRank = require('../../db');

function checkContinuousChatting(bot, message) {
    let log_channel
    if (message.guild.id == process.env.guild_id) {
        log_channel = bot.channels.cache.get(process.env.log_channel);
    } else if (message.guild.id == 896291397475368971) {
        log_channel = bot.channels.cache.get("901449184144658543");
    }
    let onmute_leave_channel_msg = '뮤트먹은 상태로 나가면 밴 됩니다.';


    // 관리자는 도배 걸리지 않음.
    if(message.member.permissions.has('ADMINISTRATOR')) return;

    // 시간, 뮤트 롤
    let messageTime = moment().tz('Asia/Seoul').locale('ko').valueOf()
    let time = bot.authors.get(message.author.id);
    let forbiddenWordTime = bot.authors.get(message.author.id) || messageTime;
    let muterole = message.channel.guild.roles.cache.find(r => r.name == "Muted")

    // 욕설 체크
    let msgs = [
        message.content.replace('\n', ''),
        message.content.replace('\n', '').replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''),
        message.content.replace('\n', '').replace(/[^a-z|A-Z]/g, ''),
    ]
    for(fw of forbiddenWord) {
        for(msg of msgs) {
            if(msg.indexOf(fw) != -1) {
                message.guild.members.cache.find(x => x.id == message.author.id).roles.add(muterole.id)
                if(messageTime == forbiddenWordTime) {
                    log_channel.send({ content: `${message.content} by ${message.author.tag}(Mute)\nWord: ${fw}` })
                    message.channel.bulkDelete(1, true);
                    message.reply({ content: `첫 채팅이 욕이냐. Mute 먹어라.\n${onmute_leave_channel_msg}`, allowedMentions: {repliedUser: true} });
                } else {
                    log_channel.send({ content: `${message.content} by ${message.author.tag}(Mute)\nWord: ${fw}` })
                    message.channel.bulkDelete(1, true);
                    message.reply({ content : `욕 하지마라. Mute 드셈.\n${onmute_leave_channel_msg}`, allowedMentions: {repliedUser: true} });
                }
                bot.authors.set(message.author.id, messageTime);
                return true;
            }
        }
    }

    // 도배성 채팅 체크
    if(!time) {
        bot.authors.set(message.author.id, messageTime);
        return false;
    } else if(messageTime - time <= 1000) {
        message.guild.members.cache.find(x => x.id == message.author.id).roles.add(muterole.id)
        message.reply(`단타 도배하지마세요. 님 Mute 드셈.\n \`\`전 채팅과의 간격 ${messageTime - time}ms\`\`\n${onmute_leave_channel_msg}`);
        bot.authors.set(message.author.id, messageTime);
        return true;
    }

    bot.authors.set(message.author.id, messageTime);
    return false;
}



const adminUserId = 745859722720051234;

async function updateLevel(message, new_level) {
    await GuildRank.findOneAndUpdate({ user_id: message.author.id, guild_id: message.guild.id }, { level: new_level })
    message.channel.send({ content: `<@${message.author.id}>님, ${new_level}이 되셨습니다!!` })
}

let xp_req = 100
function levels(xp) {
    for (let i = 1; i < 2147483647; i++) {
        if (xp <= xp_req) {
            return i;
        }
        xp_req = xp_req * 2.3;
    }
}

async function checkLevel(message,currentLevel, newXP) {
        
    const levelXPcheck = levels(newXP)

    console.log(currentLevel+" is current level")
    console.log(levelXPcheck+" is newLevelXP")

    if (currentLevel == levelXPcheck) {
        return;
    }

    else {
        updateLevel(message, levelXPcheck)
    }

}

async function changeXP(message, XP, old_xp, user_level) {
    let changeXP = old_xp + XP;
    await GuildRank.findOneAndUpdate({ user_id: message.author.id, guild_id: message.guild.id }, { xp: changeXP });
    checkLevel(message,user_level,changeXP);
}

module.exports = async (bot, message) => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") {
        if(message.author.id == adminUserId) return;

        let msg = `${message.author}이(가) 메세지를 보냈습니다.\n${message.content}`;
        bot.users.cache.find(x => x.id == adminUserId).send(msg)

        return;
    }
    //if(message.guild.id == process.env.guild_id) {
    //    if(checkContinuousChatting(bot, message)) return;
    //}

    //mongo db discord level
    let user

    user = await GuildRank.findOne({ user_id: message.author.id, guild_id: message.guild.id })

    if(!user) {
        user = new GuildRank({
            user_id: message.author.id,
            guild_id: message.guild.id,
            level: 1,
            xp: 0
        })
        await user.save();
    }

    const msgLen = message.content.split(" ").length;
    let XP = msgLen * Math.floor((Math.random() * 12) + 1);
    changeXP(message, XP, user.xp, user.level);

    let args = message.content.trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if (commandfile) {
        commandfile.run(bot, message, args)
    }

}

