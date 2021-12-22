module.exports = {
    config: {
        name: `dice`,
        aliases: [`${prefix}주사위`, `${prefix}dice`],
        description: "주사위 던지기",
        usage: "dice",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let min = 1;
        let max = 7;
        let dice_num = parseInt(Math.random() * (max - min) + min);
        return message.reply({ content : `${dice_num}가 나왔습니다.`, allowedMentions: {repliedUser: true} });
    }
}