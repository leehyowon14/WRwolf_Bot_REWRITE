const {MessageEmbed} = require("discord.js")

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
        usage: "!투표 (제목), (시간[단위: 초]), (선택 1), (선택2), ....",
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

        let embed = new MessageEmbed()
            embed.setColor("#00ff00")
            embed.setTitle(`${args[0]}`)
            embed.setDescription(`${tempString}`)
            embed.setFooter(`투표 시간: ${args[1]}초`)
            embed.setTimestamp()
        message.channel.send({ embeds: [embed] }).then(msg => {
            for (let i=0; i<args.length - 2; i++) {
                msg.react(emojis[i])
            }
            setTimeout(async function() {
                let reaction = [...msg.reactions.cache.values()]
                let result = await get_result(reaction)
                msg.edit({content: result, embeds: [embed]})
            }, parseInt(args[1]) * 1000)
        })

    }
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