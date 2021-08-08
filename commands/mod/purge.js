// 출처: https://stackoverflow.com/questions/59312602/discord-js-purge-js-command-issue
const adminUserId = 745859722720051234;
module.exports = {
    config: {
        name: "clear",
        aliases: [`${prefix}clear`, `${prefix}청소`],
        description: "청소",
        usage: "c <num>",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        //if (message.author.id != adminUserId) return message.reply("너는 권한이 없어.");
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply({content: "너는 권한이 없어.", allowedMentions: {repliedUser: true} });
        const amount = parseInt(args[0]) || 1;
        message.channel.bulkDelete(amount + 1, true);
    }
}
