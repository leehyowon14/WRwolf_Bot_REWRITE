const { MessageEmbed } = require("discord.js");
var cheerio = require('cheerio');
var request = require('request');

module.exports = {
    config: {
        name: "hitomi",
        aliases: [`${prefix}hitomi`, `${prefix}히토미`],
        description: "히토미 링크",
        usage: "hitomi [품번]",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let arg = message.content.split(" ")
        const number = arg[1]

        var url = `https://ltn.hitomi.la/galleryblock/${number}.html`;
        request(url, function(error, response, html){
            if (error) {throw error};
        
            var $ = cheerio.load(html);
        
            const title = $("h1.lillie > a").text()

            
            const tags = $(".relatedtags a").text()
            
            let embed = new MessageEmbed()
                .setColor('#73c4fa')
                .setTitle('HITOMI HELPER')
                .addField('제목', `${title}`)
                .addField('링크', `https://hitomi.la/galleries/${number}.html`)
                .addField('태그', `${tags}`)
                .addField('\u200B', '\u200B')
                .setTimestamp()
                .setFooter('Developed by 느윽대#5070')

            message.channel.send(embed)
        });
    }
}