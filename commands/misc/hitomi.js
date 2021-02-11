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
        try{
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
                    .setTitle('HITOMI(HIYOBI) HELPER')
                    .addField('제목', `${title}`)
                    .addField('히토미 링크', `https://hitomi.la/galleries/${number}.html`)
                    .addField('히요비 링크(없는작품 종종있음)', `https://hiyobi.me/reader/${number}`)
                    .addField('태그', `${tags}`)
                    .addField('\u200B', '\u200B')
                    .setTimestamp()
                    .setFooter('Developed by 느윽대#5070')

                message.channel.send(embed)
            }); 
            } catch (e) {
                console.log(e);
                return webhook.send(`An error occurred: **${e.message}**`);
            }
    }
}