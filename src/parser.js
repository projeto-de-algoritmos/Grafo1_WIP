const cheerio = require('cheerio');

const regex = /\{"rgApps":{.*}/;

const buildLinks = (html) => {
    const $ = cheerio.load(html);
    let stringJson; 
    $("script").map((i, script) => {
        script.children.map(child => {
            const str = child.data;
            const response = regex.exec(str);
            if (response != null) {
                stringJson = JSON.parse(response[0]);
            }
        });
    });
    return stringJson;
}

const getLinksHtml = (html) => {
    const links = buildLinks(html);
    console.log(links);
}

module.exports = { getLinksHtml };