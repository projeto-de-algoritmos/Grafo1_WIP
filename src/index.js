const crawler = require('./crawler');
const parser = require('./parser');


const getGameSiteHtml = async (url) => {
    return await crawler.getHtml({
        url: url
    }).then(function(response) {
        if(response.ok) {
            return response.text();
        }
    });
}
const getFirstGames = async (url) => {
    const htmlFound = await getGameSiteHtml(url);
    const gamesJson = parser.getListOfGames(htmlFound);
    return gamesJson;
}

async function main() {
    let firstJsonGames = await getFirstGames('https://store.steampowered.com/app/1293160/The_Medium/');
    for(let key in firstJsonGames) {
        var countKey = Object.keys(firstJsonGames).length;
        if(countKey < 100) {
            const url = firstJsonGames[key]['link'];
            console.log(url);
            const htmlFound = await getGameSiteHtml(url);
            const gamesJson = parser.getListOfGames(htmlFound);
            firstJsonGames = Object.assign(firstJsonGames, gamesJson);
        }
    }
    console.log(firstJsonGames);
}

main();