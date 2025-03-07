module.exports = {
    config: {
        name: `random`,
        aliases: [`${prefix}랜덤대답`, `${prefix}random`],
        description: "랜덤 대답",
        usage: "random 피자 치킨 떡볶이",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let min = 0;
        let max = args.length;
        let index = parseInt(Math.random() * (max - min) + min);
        return message.reply({ content: `${args[index]}가 나왔습니다.`, allowedMentions: {repliedUser: true} });
    }
}