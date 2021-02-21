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
        var obj = [];
        var obj2 = [];

        for (var i of adjKeys) {
            var adjValues = this.adjList.get(i)
            var conc = ""

            for (var j of adjValues) {
                conc += j.name + "[" + j.key + "]" + " / "
                obj.push({ from: i.key, to: j.key })
            }

            obj2.push({ key: i.key, text: i.name })
        }

        console.log({ obj, obj2 });

        return { obj, obj2 }
    }
}

module.exports = Graph;