module.exports = {
    config: {
        name: "unmute",
        aliases: [`${prefix}unmute`],
        description: "뮤트해제",
        usage: "unmute <@user> <이유>",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        // check if the command caller has permission to use the command
        if (!message.member.permissions.has('ADMINISTRATOR') && message.author.id != adminId) return message.reply({ content: "너는 권한이 없어.", allowedMentions: {repliedUser: true} });

        //define the reason and unmutee
        let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mutee) return message.channel.send({ content: "사용자를 입력하지 않았습니다.\n사용법 : " + module.exports.config.usage });

        // define mute role and if the mute role doesnt exist then send a message
        let muterole = message.guild.roles.cache.find(r => r.name == "Muted")
        if (!muterole) return message.channel.send({ content: `Muted 역할이 존재하지 않아요.` })

        let isMuted = mutee._roles.find(x => x == muterole.id);
        if (!isMuted) return message.channel.send({content: `${mutee.user}님은 뮤트를 먹지 않았어요.`})

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "해방을 축하해" // "No reason given"

        // remove role to the mentioned user and also send the user a dm explaing where and why they were unmuted
        mutee.roles.remove(muterole.id).then(() => {
            message.channel.send({ content: `${mutee.user}님 해방 되었어요!` })
        }).catch(e => {
            message.reply({ content: `${mutee.user}을(를) 해방 시키지 못 했어요. (오류)\n${e}`, allowedMentions: {repliedUser: true} })
        })
    }
}