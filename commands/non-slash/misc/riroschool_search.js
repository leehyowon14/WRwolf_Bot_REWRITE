const riro = require("../../../modules/riroschool.js")
const EmbedBuilder = require("discord.js")

module.exports = {
    config: {
        name: "qeqe",
        aliases: [`ㅂㄷㅂㄷ`],
        description: "ㅂㄷㅂㄷ",
        usage: "ㅂㄷㅂㄷ",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if (args[0]) {
            return;
        }

        //[{name: 이름, adress: 주소, link: 링크}, {name: 이름2, adress: 주소2, link: 링크2}, ...]
        await riro.search(args.join(' ')).then(x => result = x)

        let embed = new EmbedBuilder()
            .setTitle("검색결과")
            .setAuthor("리로스쿨(rirosoft.com)")
        
        if (!result) {
            embed.setDescription("검색결과가 없습니다.")
            return message.reply({ embeds: [embed] })
        }
        let arr = []
        let obj = {}
        for (let i = 0; i < json.length; i++) {
            obj.name = `${result[i].name}`
            obj.value = result[i].link
            arr.push(obj)
        }
        embed.addFields(arr)
        
        message.reply({ embeds: [embed] })
    }
}