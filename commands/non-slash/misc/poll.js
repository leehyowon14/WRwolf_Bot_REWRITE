const {EmbedBuilder} = require("discord.js")
const Poll = require('../../../db/poll');

//나중에 이걸로 실시간 퍼센테이지 만들거임.
function progess(num) {
    if(num > 100 || num < 0) return '100 이상의 수 혹은 음수가 입력되었습니다.'
    num = Math.floor(num / 10) 
    let bar = new Array()
    for(let i = 0; i < num; i++) {
        bar.push("⬜")
    }

    for(let j = bar.length; j < 10; j++) {
        bar.push("⬛")
    }

    return bar.join('')
}

module.exports = {
    config: {
        name: "poll",
        aliases: [`${prefix}투표`, `${prefix}poll`, `${prefix}vote`],
        description: "투표",
        usage: "!투표 (제목), (시간[단위: 시간]), (선택 1), (선택2), ....",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        args = args.join(" ").split(",");
        if (!args[0] || !args[1] || !args[2] || !args[3]) return message.channel.send({ content: `사용법: !투표 (제목), (시간[단위: 초]), (선택 1), (선택2), ....` });
        if(args > 14) message.reply("항목은 최대 10개까지 가능합니다.")
        let emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
        let tempString = ""
        let temp = 0

        for(let i=2; i<args.length; i++) {
            temp += 1
            tempString += `**${temp}. ${args[i]}**\n`
        }

        let embed = new EmbedBuilder()
            embed.setColor("#00ff00")
            embed.setTitle(`${args[0]}`)
            embed.setDescription(`${tempString}`)
            embed.setFooter({ text: `투표 시간: ${args[1]}시간` })
            embed.setTimestamp()
        message.channel.send({ embeds: [embed] }).then(async msg => {
            // 투표 메시지 ID를 poll_id로 DB에 등록
            let poll = new Poll({
                poll_id: `${msg.channel.id}-${msg.id}`,
                end_date: Date.now() + parseInt(args[1]) * 1000 * 60 * 60,
                poll_array: Array(args.length - 2).fill([])
            })
            await poll.save();

            for (let i=0; i<args.length - 2; i++) {
                msg.react(emojis[i])
            }
            setTimeout(async function() {
                let reaction = [...msg.reactions.cache.values()]
                let result = await get_result(reaction)
                msg.edit({content: result, embeds: [embed]})
            }, (parseFloat(args[1]) * 1000 * 60 * 60))
        })

    }
}

async function get_result(reaction) {
    let result = '투표가 종료되었습니다 \n\n결과'
    let len = reaction.length
    let vote_count
    let skipped = 0
    let poll = await Poll.findOne({ poll_id: `${reaction[0].message.channel.id}-${reaction[0].message.id}` });
    for (let i = 0; i < poll.poll_array.length; i++) {
        vote_count = poll.poll_array[i].length;
        result += `\n   ${i + 1}번: ${vote_count}명`;
    }
    return result
}