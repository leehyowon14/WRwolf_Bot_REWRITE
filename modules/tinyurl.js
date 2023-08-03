const axios = require('axios');

module.exports = {
    run: async (url) => {
        let res = await axios({
            method: 'get',
            url: "https://tinyurl.com/api-create.php?url=" + url
        });

        return res.data;
    }
}