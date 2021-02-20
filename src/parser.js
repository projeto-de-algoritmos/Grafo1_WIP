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

const buildFirstGameJson = (html, url) => {
    const $ = cheerio.load(html);
    const splittedUrl = url.split("/");
    const urlName = splittedUrl.pop()
    const key = splittedUrl.pop()
    let value = {};
    value[key] = {
        name: $("div.apphub_AppName").first().text(),
        url_name: urlName,
        discount_block: $("meta[itemprop = 'price']").first().attr().content,
        small_capsulev5: $("meta[itemprop='image']").first().attr().content,
        os_windows: true,
        os_macos: $("div[data-os = 'mac']").first().attr() !== undefined ? true : false,
        os_linux: $("div[data-os = 'linux']").first().attr() !== undefined ? true : false,
        link: url
    }
    return value;
}

const parseGameJson = (jsonGames) => {
    let games = jsonGames['rgApps'];
    for (let key in games) {
        if (!games[key]['name'].includes("Soundtrack")) {
            let link = 'https://store.steampowered.com/app/' + key + '/' + games[key]['url_name'];
            games[key]['link'] = link;
            games[key]['discount_block'] = getGamePrice(games[key]['discount_block']);
            delete games[key]['descids']
        } else {
            delete games[key]
        }
    }
    return games;
}

const getListOfGames = (html) => {
    const jsonGames = getGameJson(html);
    const jsonParsed = parseGameJson(jsonGames);
    return jsonParsed;
}

module.exports = { getListOfGames, buildFirstGameJson };