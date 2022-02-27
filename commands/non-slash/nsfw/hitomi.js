const { MessageEmbed } = require("discord.js");
const axios = require('axios');

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

        let response = await axios({
            method: 'get',
            url: `https://ltn.hitomi.la/galleries/${number}.js`,
            headers: { 'Referer': 'https://hitomi.la/' },
        });

        let data = JSON.parse(response.slice(18))
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
            }//end of for
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
            artists = artists.slice(0, -2)
        } else {
            artists = "None(없음)"
        }
            

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

        let file = await getThumbnailBuffer(data.files[0].hash, message).then(v => {return v})
        
        if (message.channel.nsfw) {
            if (!file) {
                return
            }
            message.channel.send({ files: [file] });
        }
    }
}
async function getGGjs() {
    let response = await axios({
        method: 'get',
        url: "https://ltn.hitomi.la/gg.js",
        headers: { 'Referer': 'https://hitomi.la/' },
    });
    return response.data;
}//end of getGGjs

async function getThumbnailBuffer(hash) {
    let gg = await getGGjs().then(v => {return v})
    eval(gg)

    hash = hash.replace(/^.*(..)(.)$/, '$2/$1/'+hash)

    let url = `https://a.hitomi.la/webpbigtn/${hash}.webp`
    let retval = "tn"
    let b = 16
    let r = /\/[0-9a-f]{61}([0-9a-f]{2})([0-9a-f])/;
    let m = r.exec(url);
    if (m) {
        let g = parseInt(m[2]+m[1], b);
        if (!isNaN(g)) {
            retval = String.fromCharCode(97 + gg.m(g)) + retval;
        }
        url = 'https://'+retval+'.'+url.slice(10)
    }
    
    let response = await axios({
        method: 'get',
        url: url,
        headers: { 'Referer': 'https://hitomi.la/' },
        responseType: 'stream'
    });

    let file = {attachment: response.data, name: "SPOILER_FILE.webp"}
    return file
}