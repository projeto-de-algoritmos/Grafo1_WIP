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

async function main() {
    const htmlFound = await getGameSiteHtml('https://store.steampowered.com/app/1293160/The_Medium/');
    const gamesJson = parser.getListOfGames(htmlFound);
    console.log(gamesJson);
}

main();