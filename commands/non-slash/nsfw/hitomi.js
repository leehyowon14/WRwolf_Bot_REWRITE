const { MessageEmbed } = require("discord.js");
var request = require('request');

module.exports = {
    config: {
        name: `hitomi`,
        aliases: [`${prefix}히토미`, `${prefix}hitomi`, `${prefix}hiyobi`, `${prefix}히요비`, `${prefix}h`],
        description: "히토미 링크",
        usage: "hitomi [품번]",
        accessableby: "Members",
    },
    run: (bot, message, args) => {
        let number = args[0]
        if (!number) {
            let embed = new MessageEmbed()
                .setColor('#ED4245')
                .setAuthor({name:'에러!'})
                .setTitle('번호를 입력해주세요')
                .setTimestamp()
                .setFooter({text:'Developed by sG.wolf#7777'})
            message.channel.send({ embeds: [embed] })
            return;
        }

        
        var options = {
            url : `https://ltn.hitomi.la/galleries/${number}.js`,
            method:'GET',
            headers: {
                'Accept': '*/*',
				'Connection': 'keep-alive',
				'Referer': 'https://hitomi.la'
            }
        };
        let data;
        request(options, async (error, response, body) => {

            data = JSON.parse(body.slice(18))

            let title = data.title
            
            if (!title) {
                let embed = new MessageEmbed()
                    .setColor('#ED4245')
                    .setAuthor({name:'에러!'})
                    .setTitle('없는작품입니다')
                    .setTimestamp()
                    .setFooter({text:'Developed by sG.wolf#7777'})
                return message.channel.send({ embeds: [embed] })
            }
            
            let tags="";
            if (!data.tags) {
                tags = "None(없음)"
            } else {
                for (let i = 0; i < data.tags.length; i++) {
                    let tag = data.tags[i];
                    if (tag.female == "1") {
                        tags = tags + `♀️` + tag.tag
                    } else if (tag.male == "1") {
                        tags = tags + `♂️` + tag.tag
                    } else {
                        tags = tags + `🏷` + tag.tag
                    }
                    if (i != data.tags.length-1) {
                        tags = tags + ", "
                    }
                }
            }
            
            let languages = data.language_localname
            if (data.language) {
                languages = languages + `(` + data.language + `)`
            }

            let artists = "";
            if (data.artists) {
                for (let i = 0; i<data.artists.length; i++) {
                    let artist = data.artists[i].artist
                    artists = `${artists}${artist}, `
                }
            } else {
                artists = "None(없음)"
            }
            artists = artists.slice(0, -2)
            

            let embed = new MessageEmbed()
                .setColor('#5865F2')
                .setTitle('HITOMI HELPER')
                .addField('제목', `${title}`)
                .addField('언어', `${languages}`)
                .addField('아티스트', `${artists}`)
                .addField('히토미 링크', `https://hitomi.la/galleries/${number}.html`)
                .addField('태그', `${tags}`)
                .addField('\u200B', '\u200B')
                .setTimestamp()
                .setFooter({text:'Developed by sG.wolf#7777'})

            message.channel.send({ embeds: [embed] })

            let thumbnails;
            await getThumbnailPath(data.files[0].hash).then(function(path) {
                thumbnails = `https://a.hitomi.la/webp/${path}`
                if (message.channel.nsfw) {
                    if (!thumbnails) {
                        return
                    }
                    message.channel.send({ files: [{attachment: thumbnails, name: "SPOILER_FILE.jpg"}] });
                }//if nsfw channel
                console.log(thumbnails)
            }) // end of getThumbnailPath
        }); //end of request
    }
}

async function getGGjs() {
    return new Promise((resolve, reject) => {
        var options = {
            url : `https://ltn.hitomi.la/gg.js`,
            method:'GET',
            headers: {
                'Accept': '*/*',
				'Connection': 'keep-alive',
				'Referer': 'https://hitomi.la'
            }
        };
        request(options, function(error, response, gg){
            resolve(gg)
        }); // end of request
    });//end of promise
}

async function getThumbnailPath(hash) {
    await getGGjs().then(function(gg) {
        eval(gg)
        return new Promise((resolve, reject) => {
            let first = gg.b
            let second = gg.s(hash)
            let url = `https://a.hitomi.la/webp/${first}${second}/${hash}`
            
            let retval = "a"

        })
    });
}