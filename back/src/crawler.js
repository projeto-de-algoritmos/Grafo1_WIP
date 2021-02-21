const fetch = require('node-fetch');

const getHtml = async ({url}) => {
    const response = await fetch(url).then(response => {
            return response;
        }).catch(error => console.log(error));
    return response;
} 

module.exports = { getHtml };