
const testGap = (pathRank = 1, nodes = 16) => {
    let l = []
    let n = 16 / nodes; 
    while (n < 16){
        l.push(n)
        n = n + (16 / nodes)
    }
    if (l.includes(pathRank)){
        return true
    }
    return false
}

const createPaths = function(data, nodeWidth){
    let levels = {
        0: {nodes: 1, runner: 0},
        1: {nodes: 4, runner: 0},
        2: {nodes: 8, runner: 0},
        3: {nodes: 16, runner: 0}
    }
    let paths = []
    let i = 0;
    for (const d of data){ // paths
        let list = []
        for (const [key, value] of Object.entries(levels)) { // levels
            (testGap(i, value.nodes)) ? value.runner = 1.01 * value.runner: null
            let y = value.runner + (d.value/2)
            list.push({x: +key-nodeWidth, y: +y})
            list.push({x: +key+nodeWidth, y: +y})
            value.runner = value.runner + d.value
        }
        i++;
        paths.push({id: +d.id, value: +d.value, values: list})
    }
    return paths
}

class Nodes {
    constructor(nominal, per_capita, nodeWidth, tweened){
        this.nominal = createPaths(nominal, nodeWidth);
        this.per_capita = createPaths(per_capita, nodeWidth);
        let active = nominal.forEach(d => {
            return {id: d.id, value: tweened(d.value), values: tweened(d.values)}
        });}

    get active() {
        return this.active;
    }

    setPerCapita() {
        for (const [key, obj] of Object.entries(this.active)) {
            obj.values.set(this.per_capita[key].values)
            obj.value.set(this.per_capita[key].value)
        }
    }

    setNominal() {
        for (const [key, obj] of Object.entries(this.active)) {
            obj.values.set(this.nominal.array[key].values)
            obj.value.set(this.nominal.array[key].value)
        }
    }

}

export default Nodes;