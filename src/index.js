const crawler = require('./crawler');
const parser = require('./parser');
const Graph = require('./models/graph');
const Game = require('./models/game');
const { html } = require('cheerio');

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
    const firstGameJson = parser.buildFirstGameJson(htmlFound, url);
    const gamesJson = parser.getListOfGames(htmlFound);
    return Object.assign(firstGameJson, gamesJson);
}

const bfs = async (graph, firstListGameJson, depth) => {
    let queue = [];
    let node = graph.adjList.keys().next().value
    queue.push(node);
    for(let individualNode of queue) {
        if(graph.adjList.size > depth) {
            console.log("STOP");
            break;
        }
        queue.shift();
        if (individualNode.key !== 1293160){
            const htmlFound = await getGameSiteHtml(individualNode.link);
            firstListGameJson = parser.getListOfGames(htmlFound);
        }
        for (let key in firstListGameJson) {
            let gameJson = firstListGameJson[key];
            delete firstListGameJson[key];
            let game = new Game(key, gameJson);
            queue.push(game);
            graph.addEdge(individualNode, game);
        }
    }
}

async function main() {
    let firstListGameJson = await getFirstGames('https://store.steampowered.com/app/1293160/The_Medium');
    // Create Graph for games
    let graph = new Graph(new Game(1293160, firstListGameJson[1293160]));
    delete firstListGameJson[1293160];
    await bfs(graph, firstListGameJson, 100)
    return graph.printGraph();
}

module.exports = { main };