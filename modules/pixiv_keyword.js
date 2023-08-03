const axios = require("axios");

module.exports = {
    search: async (keywords, nsfw) => {
        //https://www.pixiv.net/ajax/search/artworks/키워드?word=키워드&order=popular_d&mode=검색모드&p=1&s_mode=s_tag_full&type=all&lang=ko 검색모드: all/safe/r18
        if (keywords.length == 0) return false;
        if (typeof keywords == "string") keywords = [keywords]
        if (!Array.isArray(keywords)) return false;

        let req_url = `https://www.pixiv.net/ajax/search/artworks/${encodeURI(keywords.join(" "))}?word=${encodeURI(keywords.join(" "))}&order=popular_d&mode=safe&p=1&s_mode=s_tag_full&type=all&lang=ko`
        if (nsfw) {
            req_url = `https://www.pixiv.net/ajax/search/artworks/${encodeURI(keywords.join(" "))}?word=${encodeURI(keywords.join(" "))}&order=popular_d&mode=r18&p=1&s_mode=s_tag_full&type=all&lang=ko`
        }

        let res = await axios({
            method: 'get',
            url: req_url,
            headers: { 'cookie': 'PHPSESSID=42542886_rvVEoEXwazK8lLuffwdM1R4WYdPkSAT1;', "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" }
        })
            .then(function (response) {
                let data = response.data
            
                if (data.error) return false;
                data = data.body

                let array = []

                data.illustManga.data.forEach((object) => {
                    let date_split = object.createDate.split("T")
                    object.createDate = date_split[0] + " " + date_split[1].split("+")[0]
                    array.push(object)
                })

                data.popular.recent.forEach((object) => {
                    let date_split = object.createDate.split("T")
                    object.createDate = date_split[0] + " " + date_split[1].split("+")[0]
                    array.push(object)
                })

                data.popular.permanent.forEach((object) => {
                    let date_split = object.createDate.split("T")
                    object.createDate = date_split[0] + " " + date_split[1].split("+")[0]
                    array.push(object)
                })
                return array
            })
            .catch(function (error) {
                console.log(error);
                return false;
            });
        return res
    } 
}