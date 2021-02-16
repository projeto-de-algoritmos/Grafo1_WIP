const fetch = require('node-fetch');

const getHtml = async ({url}) => {
    const opts = {
        headers: {
            Cookie: 'birthtime=-223592399'
        }
    }
    const response = await fetch(url, opts).then(response => {
            return response;
        }).catch(error => console.log(error));
    return response;
} 

module.exports = { getHtml };