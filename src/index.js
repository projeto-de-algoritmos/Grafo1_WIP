const fetch = require('node-fetch');

const crawler = async ({url}) => {
    const opts = {
        headers: {
            Cookie: 'birthtime=-223592399'
        }
    }
    const response = await fetch(url, opts);
    const html = await response.text();
    console.log(html);
};

crawler({
    url: 'https://store.steampowered.com/app/105600/Terraria/'
})
