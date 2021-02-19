const express = require('express');
const crawler = require('./crawler');
const parser = require('./parser');
const Graph = require('./models/graph');
const Game = require('./models/game');
const path = require("path");
const { html } = require('cheerio');

const app = new express();

app.listen(3000);

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

async function main() {
    let firstListGameJson = await getFirstGames('https://store.steampowered.com/app/1293160/The_Medium');
    console.log(firstListGameJson)
    // Create Graph for games
    let graph = new Graph();
    for(let key in firstListGameJson) {
        let gameJson = firstListGameJson[key];
        let game = new Game(key, gameJson);

        // Add recomended games of first game as a vertex of graph
        graph.addVertex(game);

        var countKey = Object.keys(firstListGameJson).length;
        if(countKey < 150) {
            const url = firstListGameJson[key]['link'];
            console.log(url);
            const htmlFound = await getGameSiteHtml(url);
            const gamesJson = parser.getListOfGames(htmlFound);

            for (let index in gamesJson) {
                // Creates an edge for a game and recomended games, and create a vertex if a game don't exist
                graph.addEdge(game, new Game(index, gamesJson[index]))
            }

            firstListGameJson = Object.assign(firstListGameJson, gamesJson);
        }
    }

    graph.printGraph();
}

main();

app.get('/', function(_, response){
    console.log();
    response.sendFile(path.join(__dirname + '/view/main.html'));
});