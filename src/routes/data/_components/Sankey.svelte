<script lang="ts">
	import { tweened } from 'svelte/motion';
    import Nodes from '../_data/sankey'
    import * as d3 from 'd3'
    import data from '../_data/sankeyData'

    let width: number = 200;
    let height: number = 500;
    let numberOfLevels: number = 4;
    let numberOfNodes: number = 16;
    let nodeWidth: number = .01;

    let paths = new Nodes(data.nominal, data.per_capita, nodeWidth, tweened)

    let levels = [0,1,2,3]
    let input = "nominal"

    let active = paths.active

    $: (input == "nominal") && paths.setNominal()
    $: (input == "per_capita") && paths.setPerCapita()

    $: yScale = d3.scaleLinear()
                .domain([0, d3.max($active[15].values, d => d.y)]) // this won't work, create a class method 
                .range([0, height])
 
    $: xScale = d3.scaleLinear()
                .domain([-nodeWidth, numberOfLevels+nodeWidth])
                .range([0, width])

    $: path = d3.line()
                .x(d => xScale(d.x))
                .y(d => yScale(d.y))
                

</script>

<select bind:value={input}>
    <option value="nominal">Nominal</option>
    <option value="per_capita">Per Capita</option>
</select>

<div bind:clientHeight={height} bind:clientWidth={width}>

<svg>
    {#each active as $d}
        <path
        d={path($d.values)}
        fill="none"
        stroke="black"
        stroke-opacity="0.5"
        stroke-width={yScale($d.value)}
        />
    {/each}

    {#each levels as l}
        {#each active as $d, i}
            <rect
            x={xScale(l-nodeWidth)}
            width={xScale(nodeWidth*2)}
            y={yScale($d.values[(l*2)].y - $d.value/2)}
            height={yScale($d.value)}
            fill="red"
            />
        {/each}
    {/each}

    </svg>

</div>



<style lang="sass">

    div
        width: 100%
        height: 100%
        margin: 0

    svg
        width: 100%
        height: 100%
        margin: 0

</style>