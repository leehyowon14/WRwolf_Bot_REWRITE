const axios = require('axios');

module.exports = {
    run: async (url) => {
        let response = await axios({
            method: 'get',
            url: "https://tinyurl.com/api-create.php?url=" + url,
        });
        if (response.data == "Error") return url
        return response.data
    }
}