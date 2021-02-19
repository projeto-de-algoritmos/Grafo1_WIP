class Graph {
    constructor(firstGame) {
        this.adjList = new Map().set(firstGame, []);
    }

    addVertex(game) {
        let isEqual = false
        this.adjList.forEach((_, value) => {
            if (value.key === game.key) {
                isEqual = true
                return
            }
        })
        if (!isEqual) {
            this.adjList.set(game, [])
        }
    }

    addEdge(gameFather, gameSon) {
        this.adjList.get(gameFather).push(gameSon)
        this.addVertex(gameSon);
    }

    printGraph() {
        var adjKeys = this.adjList.keys()
        for (var i of adjKeys) {
            var adjValues = this.adjList.get(i)
            var conc = ""

            for (var j of adjValues) {
                conc += j.name + "[" + j.key + "]" + " / "
            }

            console.log("\n" + i.name + "[" + i.key + "]" + " -> " + conc + "\n")
        }
    }
}

module.exports = Graph;