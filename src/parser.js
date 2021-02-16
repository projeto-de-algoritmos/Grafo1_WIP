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
        let link = 'https://store.steampowered.com/app/' + key + '/' + games[key]['url_name'];
        games[key]['link'] = link;
        games[key]['discount_block'] = getGamePrice(games[key]['discount_block']);
        delete games[key]['descids']
    }
    return games;
}

const getListOfGames = (html) => {
    const jsonGames = getGameJson(html);
    const jsonParsed = parseGameJson(jsonGames);
    return jsonParsed;
}

module.exports = { getListOfGames };