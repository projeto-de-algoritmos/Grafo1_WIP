const crawler = require('./crawler');
const parser = require('./parser');
const Graph = require('./models/graph');
const Profile = require('./models/profile');

const getProfileSiteHtml = async (url) => {
    return await crawler.getHtml({
        url: url
    }).then(function(response) {
        if(response.ok) {
            return response.text();
        }
    });
}

const getFirstProfile = async (url, graph) => {
    const htmlFound = await getProfileSiteHtml(url);
    const firstProfileJson = parser.buildFirstProfileJson(htmlFound, url);
    graph.addVertex(new Profile(1, firstProfileJson[1]));
    const profilesJson = parser.getListOfProfiles(htmlFound);
    return profilesJson;
}

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

async function main(instaLink, deph) {
    // Create Graph for Insta Profile
    let depth = deph;
    if (deph > 25 || deph === undefined || deph === null || deph < 0) {
        deph = 1;
    }
    let graph = new Graph(depth);
    let firstProfile = await getFirstProfile(instaLink, graph);

    await bfs(graph, firstProfile, depth)
    return graph.printGraph();
}

module.exports = { main };