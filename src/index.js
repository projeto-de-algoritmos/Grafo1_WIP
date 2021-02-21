const crawler = require('./crawler');
const parser = require('./parser');
const Graph = require('./models/graph');

const getProfileSiteHtml = async (url) => {
    return await crawler.getHtml({
        url: url
    }).then(function(response) {
        if(response.ok) {
            return response.text();
        }
    });
}

// const getFirstGames = async (url) => {
//     const htmlFound = await getGameSiteHtml(url);
//     const firstGameJson = parser.buildFirstGameJson(htmlFound, url);
//     const gamesJson = parser.getListOfGames(htmlFound);
//     return Object.assign(firstGameJson, gamesJson);
// }

const getFirstProfile = async (url, graph) => {
    const htmlFound = await getProfileSiteHtml(url);
    const firstProfileJson = parser.buildFirstProfileJson(htmlFound, url);
    graph.addVertex(new Profile(1, firstProfileJson[1]));
    const profilesJson = parser.getListOfProfiles(htmlFound);
    return profilesJson;
}

// const bfs = async (graph, firstListGameJson, depth) => {
//     let queue = [];
//     let node = graph.adjList.keys().next().value
//     queue.push(node);
//     for(let individualNode of queue) {
//         if(graph.adjList.size > depth) {
//             console.log("STOP");
//             break;
//         }
//         queue.shift();
//         if (individualNode.key !== 1293160){
//             const htmlFound = await getGameSiteHtml(individualNode.link);
//             firstListGameJson = parser.getListOfGames(htmlFound);
//         }
//         for (let key in firstListGameJson) {
//             let gameJson = firstListGameJson[key];
//             delete firstListGameJson[key];
//             let game = new Game(key, gameJson);
//             queue.push(game);
//             graph.addEdge(individualNode, game);
//         }
//     }
// }

const bfs = async (graph, listInstaJson, depth) => {
    let queue = [];
    let node = graph.adjList.keys().next().value
    queue.push(node);
    for(let individualNode of queue) {
        if(graph.adjList.size >= depth) {
            console.log("STOP");
            break;
        }
        queue.shift();
        if (individualNode.key !== 1){
            const htmlFound = await getProfileSiteHtml(individualNode.link);
            listInstaJson = parser.getListOfProfiles(htmlFound);
        }
        for (let key in listInstaJson) {
            if (key != 0 && key != 1) {
                let profileJson = listInstaJson[key];
                delete listInstaJson[key];
                let profile = new Profile(key, profileJson);
                queue.push(profile);
                graph.addEdge(individualNode, profile);
            }
        }
    }
}

async function main() {
    // Create Graph for Insta Profile
    const depth = 200;
    let graph = new Graph(depth);
    let firstProfile = await getFirstProfile('https://www.instagram.com/quebrandootabu', graph);

    await bfs(graph, firstProfile, depth)
    return graph.printGraph();
}

module.exports = { main };