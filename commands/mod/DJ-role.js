module.exports = {
    config: {
        name: "DJ-role",
        aliases: [`${prefix}dj`],
        description: "DJ",
        usage: "DJ <@username>",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("너는 권한이 없어.");

        let DJmention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!DJmention) return message.channel.send("사용자를 입력하지 않았습니다.\n사용법 : " + module.exports.config.usage);

        let DJrole = message.channel.guild.roles.cache.find(r => r.name == "DJ")
        if (!DJrole) {
            try {
                DJrole = await message.guild.roles.create({
                    data: {
                        name: "DJ",
                    },
                })
            } catch (e) {
                console.log(e.stack);
            }
        }
        let isDJ = DJmention._roles.find(x => x == DJrole.id);
        if (!isDJ) {
            mutee.roles.remove(muterole.id).then(() => {
                message.channel.send(`${DJmention.user}님의 DJ역할이 삭제 되었어요!`)
            }).catch(e => {
                message.reply(`${DJmention.user}님의 DJ 역할을 삭제하지 못했어요. (오류)\n${e}`)
            })
            return;
        }

        DJmention.roles.add(DJrole.id).then(() => {
            message.channel.send(`${DJmention.user} DJ역할 추가됨.`)
        }).catch(e => {
            message.reply(`${DJmention.user}에게 DJ역할을 추가하지 못 했어요. 미안해요. (오류)`)
        })
    }
}