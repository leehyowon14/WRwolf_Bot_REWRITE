const request = require("request")

module.exports = {
    run: async (url) => {
        return new Promise((resolve, reject) => {
            request("https://tinyurl.com/api-create.php?url=" + url, (error, response, body) => {
                console.log("tinyurl module: " + body)
                if (body == "Error") {
                    resolve(url);
                }
                resolve(body)
            })
        })
    }
}