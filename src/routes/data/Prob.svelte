<script lang="ts">
    import { LayerCake, Svg } from "layercake";
    import XAxis from "./_components/prob/XAxis.svelte";
    import YAxis from "./_components/prob/YAxis.svelte";
    import { line } from "d3-shape"

    import probData from "./_data/prob-data";

    import { scaleLinear, scaleOrdinal } from "d3-scale";

    let data = {};

    probData.forEach( d => data[d.race + "_" + d.sex + "_" + d.age] = 
    [
        {x: d.unknown_prob, y: 0},
        {x: d.race_added_prob + d.unknown_prob, y:1},
        {x: d.sex_added_prob + d.race_added_prob + d.unknown_prob, y:2},
        {x: d.age_added_prob + d.race_added_prob + d.unknown_prob, y:3},
        {x: d.race_sex_added_prob + d.age_added_prob + d.race_added_prob + d.unknown_prob, y:4},
        {x: d.race_age_added_prob + d.race_sex_added_prob + d.age_added_prob + d.race_added_prob + d.unknown_prob, y:5},
        {x: d.sex_age_added_prob + d.race_age_added_prob + d.race_sex_added_prob + d.age_added_prob + d.race_added_prob + d.unknown_prob, y:6},
        {x: d.prob, y: 7}
    ])

    let width = 300;
    let height = 400;
    let padding = {top: 20, right: 20, bottom: 20, left: 20};

    $: xScale = scaleLinear()
        .domain([0, 8.5])
        .range([padding.left, width - padding.right]);

    $: yScale = scaleLinear()
        .domain([0, 7])
        .range([height - padding.bottom, padding.top]);

    $: xRange = xScale.range();
    $: yRange = yScale.range();
    $: path = line()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y))

    console.log(data.black_female_minor[2 + 1].y)

</script>
<div class="chart-container" bind:clientHeight={height} bind:clientWidth={width}>
<LayerCake>
    <Svg>
        {#each Object.values(data) as d}
                <path 
                    d="{path(d)}"
                    stroke="black"
                    fill= "none"
                    stroke-width="2"
                    stroke-opacity="0.5"
                />
            {#each d as p}
                <circle
                    cx="{xScale(p.x)}"
                    cy="{yScale(p.y)}"
                    r = "3"
                    fill="black"
                    fill-opacity= "0.5"
                />
            {/each}
        {/each}
        {#each data.black_female_minor as d, i}

        <rect 
            x = {data.black_female_minor[i + 1] ? data.black_female_minor[i + 1].x - d.x > 0 ? xScale(d.x) : xScale(data.black_female_minor[i + 1].x) : 0}
            y = {yScale(d.y + 0.75)}
            height = {yScale(6.7)}
            width = { data.black_female_minor[i + 1] ? xScale(Math.abs(data.black_female_minor[i + 1].x - d.x)) - padding.right : 0 }
            fill = {data.black_female_minor[i + 1] ? data.black_female_minor[i + 1].x - d.x > 0 ? "#FFB84C" : "#A459D1" : 0}
            fill-opacity = 0.7
        />

    {/each}


        <XAxis
            {xScale}
            {width}
            {height}
            {yRange}
        />
        <YAxis
            {yScale}
            {padding}
            {xRange}
            xTick={xRange[1] + 10}
        />
    </Svg>
</LayerCake>
</div>

<style lang="sass">
    svg 
        width: 100%
        height: 100%

    .chart-container
        height: 100%
        width: 100%


</style>