const crawler = require('./crawler');
const parser = require('./parser');
const Graph = require('./models/graph');
const Game = require('./models/game');

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
    // Create Graph for games
    let graph = new Graph();
    for(let key in firstJsonGames) {
        let gameJson = firstJsonGames[key];
        let game = new Game(key, gameJson);

        // Add recomended games of first game as a vertex of graph
        graph.addVertex(game);

        var countKey = Object.keys(firstJsonGames).length;
        if(countKey < 150) {
            const url = firstJsonGames[key]['link'];
            console.log(url);
            const htmlFound = await getGameSiteHtml(url);
            const gamesJson = parser.getListOfGames(htmlFound);

            for (let index in gamesJson) {
                // Creates an edge for a game and recomended games, and create a vertex if a game don't exist
                graph.addEdge(game, new Game(index, gamesJson[index]))
            }

            firstJsonGames = Object.assign(firstJsonGames, gamesJson);
        }
    }

    graph.printGraph();
}

main();