const { MessageEmbed } = require("discord.js");
var cheerio = require('cheerio');
var request = require('request');

module.exports = {
    config: {
        name: "hitomi",
        aliases: [`${prefix}hitomi`, `${prefix}히토미`, `${prefix}hiyobi`, `${prefix}히요비`, `${prefix}h`],
        description: "히토미 링크",
        usage: "hitomi [품번]",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        const number = args[0]
        if (!number) {
            let embed = new MessageEmbed()
            .setColor('#f94343')
            .setAuthor('에러!')
            .setTitle('번호를 입력해주세요')
            .setTimestamp()
            .setFooter('Developed by 느윽대#5070')
        
        message.channel.send(embed)
        }

        
        var url = `https://ltn.hitomi.la/galleryblock/${number}.html`;

        request(url, function(error, response, html){
                
            var $ = cheerio.load(html);
        
            const title = $("h1.lillie > a").text()
            
            if (!title) {
                let embed = new MessageEmbed()
                    .setColor('#f94343')
                    .setAuthor('에러!')
                    .setTitle('없는작품입니다')
                    .setTimestamp()
                    .setFooter('Developed by 느윽대#5070')
                message.channel.send(embed)
            }
            
            const tags = $(".relatedtags a").text()

            const languages = $("a[href^='/index'][href$='.html']").text()

            if (languages == "한국어") {
                let embed = new MessageEmbed()
                    .setColor('#73c4fa')
                    .setTitle('HITOMI(HIYOBI) HELPER')
                    .addField('제목', `${title}`)
                    .addField('언어', languages)
                    .addField('히토미 링크', `https://hitomi.la/galleries/${number}.html`)
                    .addField('히요비 링크', `https://hiyobi.me/reader/${number}`)
                    .addField('태그', `${tags}`)
                    .addField('\u200B', '\u200B')
                    .setTimestamp()
                    .setFooter('Developed by 느윽대#5070')

                message.channel.send(embed)
            }else{
                let embed = new MessageEmbed()
                    .setColor('#73c4fa')
                    .setTitle('HITOMI HELPER')
                    .addField('제목', `${title}`)
                    .addField('언어', languages)
                    .addField('히토미 링크', `https://hitomi.la/galleries/${number}.html`)
                    .addField('태그', `${tags}`)
                    .addField('\u200B', '\u200B')
                    .setTimestamp()
                    .setFooter('Developed by 느윽대#5070')

                message.channel.send(embed)
                }
            }); 
    }
}