const request = require("request")
const { MessageEmbed } = require("discord.js");
const tinyurl = require("../../modules/tinyurl");

async function spotify(search, message) {
    if (!search) {
        let embed = new MessageEmbed()
            .setColor('#ED4245')
            .setAuthor('에러!')
            .setTitle('검색할 음악의 제목을 입력하여주세요')
            .setTimestamp()
            .setFooter('Developed by sG.wolf#7777')
        message.channel.send({ embeds: [embed] })
        return;
    }
    let url = `${process.env.nocodeapi_spotify}search?q=${search}&type=track&perPage=3&page=1`
    request(url, (error, response, body) => {
        let data = JSON.parse(body)
        if (!data.tracks.total) {
            let embed = new MessageEmbed()
                .setColor('#ED4245')
                .setAuthor(`Search results for "${search}`)
                .addField("Eroor", `Unknown Error`)
                .setTimestamp()
                .setFooter('Developed by sG.wolf')
            message.channel.send({ embeds: [embed] })
            return
        }
        if (data.tracks.total == 0) {
            let embed = new MessageEmbed()
            .setColor('#ED4245')
            .setAuthor(`Search results for "${search}`)
            .addField("No result", `No result`)
            .setTimestamp()
            .setFooter('Developed by sG.wolf')
        message.channel.send({ embeds: [embed] })
        return
        }
        let artist_1 = data.tracks.items[0].album.artists[0].name
        let album_1 = data.tracks.items[0].album.name
        let album_type_1 = data.tracks.items[0].album.album_type
        await tinyurl.run(data.tracks.items[0].external_urls.spotify).then(function (v) {
            song_url_1 = v
        })
        let song_name_1 = data.tracks.items[0].name
        await tinyurl.run(data.tracks.items[0].preview_url).then(function (v) {
            song_preview_1 = v
        })
        if (data.tracks.total == 1) {
            let embed = new MessageEmbed()
                .setColor('#57F287')
                .setAuthor(`Search results for "${search}`)
                .addField(artist_1 + " - " + song_name_1, `Album: ${album_1}(${album_type_1})\nSpotify: ${song_url_1}\nPreview: ${song_preview_1}`)
                .setTimestamp()
                .setFooter('Developed by sG.wolf')
            message.channel.send({ embeds: [embed] })
            return
        }
        let artist_2 = data.tracks.items[1].album.artists[0].name
        let album_2 = data.tracks.items[1].album.name
        let album_type_2 = data.tracks.items[1].album.album_type
        await tinyurl.run(data.tracks.items[1].external_urls.spotify).then(function (v) {
            song_url_2 = v
        })
        let song_name_2 = data.tracks.items[1].name
        await tinyurl.run(data.tracks.items[1].preview_url).then(function (v) {
            song_preview_2 = v
        })
        if (data.tracks.total == 2) {
            let embed = new MessageEmbed()
                .setColor('#57F287')
                .setAuthor(`Search results for "${search}`)
                .addField(artist_1 + " - " + song_name_1, `Album: ${album_1}(${album_type_1})\nSpotify: ${song_url_1}\nPreview: ${song_preview_1}`)
                .addField(artist_2 + " - " + song_name_2, `Album: ${album_2}(${album_type_2})\nSpotify: ${song_url_2}\nPreview: ${song_preview_2}`)
                .setTimestamp()
                .setFooter('Developed by sG.wolf')
            message.channel.send({ embeds: [embed] })
            return
        }
        
        let artist_3 = data.tracks.items[2].album.artists[0].name
        let album_3 = data.tracks.items[2].album.name
        let album_type_3 = data.tracks.items[2].album.album_type
        await tinyurl.run(data.tracks.items[2].external_urls.spotify).then(function (v) {
            song_url_3 = v
        })
        let song_name_3 = data.tracks.items[2].name
        await tinyurl.run(data.tracks.items[2].preview_url).then(function (v) {
            song_preview_3 = v
        })

        let embed = new MessageEmbed()
            .setColor('#57F287')
            .setAuthor(`Search results for "${search}`)
            .addField(artist_1 + " - " + song_name_1, `Album: ${album_1}(${album_type_1})\nSpotify: ${song_url_1}\nPreview: ${song_preview_1}`)
            .addField(artist_2 + " - " + song_name_2, `Album: ${album_2}(${album_type_2})\nSpotify: ${song_url_2}\nPreview: ${song_preview_2}`)
            .addField(artist_3 + " - " + song_name_3, `Album: ${album_3}(${album_type_3})\nSpotify: ${song_url_3}\nPreview: ${song_preview_3}`)
            .setTimestamp()
            .setFooter('Developed by sG.wolf')
        message.channel.send({ embeds: [embed] })
    })
    
}

module.exports = {
    config: {
        name: `searchmusic`,
        aliases: [`${prefix}spotify`],
        description: "스포티파이 음악 검색",
        usage: "!spotify [song name]",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let search = args.join(' ')
        spotify(search, message)
    }
}