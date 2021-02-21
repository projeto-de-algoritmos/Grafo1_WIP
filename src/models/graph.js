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
                obj.push({ from: i.key, to: j.key })
            }

            obj2.push({ key: i.key, text: i.name })
        }

        console.log({ obj, obj2 });

        return { obj, obj2 }
    }
}

module.exports = Graph;