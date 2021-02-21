class Graph {
    constructor(depth) {
        this.adjList = new Map();
        this.depth = depth;
    }

    addVertex(profile) {
        let isEqual = false
        this.adjList.forEach((_, value) => {
            if (value.key === profile.key) {
                isEqual = true
                return
            }
        })
        if (!isEqual) {
            this.adjList.set(profile, [])
        }
    }

    addEdge(profileFathe, profileSon) {
        if(this.adjList.size < this.depth) {
            this.adjList.get(profileFathe).push(profileSon)
            this.addVertex(profileSon);
        }
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
                obj.push({ from: parseInt(i.key), to: parseInt(j.key) })
            }

            obj2.push({ key: parseInt(i.key), ...i })
        }

        return { obj2, obj }
    }
}

module.exports = Graph;