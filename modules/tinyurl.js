const axios = require('axios');

module.exports = {
    run: async (url) => {
        axios.get("https://tinyurl.com/api-create.php?url=" + url)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return url
            });
    }
}