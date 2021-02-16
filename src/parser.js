const cheerio = require('cheerio');

const regex = /\{"rgApps":{.*}/;

const getGamePrice = (html) => {
    const $ = cheerio.load(html);
    return $('div.discount_final_price').first().text();
}

const getGameJson = (html) => {
    const $ = cheerio.load(html);
    let json; 
    $("script").map((_, script) => {
        script.children.map(child => {
            const regexResponse = regex.exec(child.data);
            if (regexResponse != null) {
                json = JSON.parse(regexResponse[0]);
            }
        });
    });
    return json;
}

const parseGameJson = (jsonGames) => {
    let games = jsonGames['rgApps'];
    for (let key in games) {
        let gameName = games[key].name.replace(/[^a-zA-Z ]/g,'');
        gameName = gameName.replace(/\s/g, '_');
        let link = 'https://store.steampowered.com/app/' + key + '/' + gameName;
        games[key]['link'] = link;
        games[key]['discount_block'] = getGamePrice(games[key]['discount_block']);
        delete games[key]['descids']
    }
    return games;
}

const getLinksHtml = (html) => {
    const jsonGames = getGameJson(html);
    const jsonParsed = parseGameJson(jsonGames);
    console.log(jsonParsed);
}

module.exports = { getLinksHtml };