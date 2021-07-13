const moment = require('moment-timezone');
const forbiddenWord = require('../../util/forbiddenWord.json');

function checkContinuousChatting(bot, message) {
    const log_channel = bot.channels.cache.get(process.env.log_channel);
    let onmute_leave_channel_msg = '뮤트먹은 상태로 나가면 밴 됩니다.';


    // 관리자는 도배 걸리지 않음.
    if(message.member.hasPermission('ADMINISTRATOR')) return;

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
                    log_channel.send(message.content)
                    message.channel.bulkDelete(1, true);
                    message.reply(`첫 채팅이 욕이냐. 이 개새끼야. Mute 먹어라.\n\`\`사용한 욕: ${fw}\`\`\n${onmute_leave_channel_msg}`);
                } else {
                    log_channel.send(message.content)
                    message.channel.bulkDelete(1, true);
                    message.reply(`욕 하지마라. Mute 드셈.\n\`\`사용한 욕: ${fw}\`\`\n${onmute_leave_channel_msg}`);
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
        message.reply(`단타 도배하지마세요. 씨발 님 Mute 드셈.\n \`\`전 채팅과의 간격 ${messageTime - time}ms\`\`\n${onmute_leave_channel_msg}`);
        bot.authors.set(message.author.id, messageTime);
        return true;
    }

    bot.authors.set(message.author.id, messageTime);
    return false;
}



const adminUserId = 745859722720051234;

module.exports = async (bot, message) => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") {
        if(message.author.id == adminUserId) return;

        let msg = `${message.author}이(가) 메세지를 보냈습니다.\n${message.content}`;
        bot.users.cache.find(x => x.id == adminUserId).send(msg)

        return;
    }
    if(message.guild.id == process.env.guild_id) {
        if(checkContinuousChatting(bot, message)) return;
    }

    let args = message.content.trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if (commandfile) {
        commandfile.run(bot, message, args)
    }

}
