<script lang="ts">
    import { LayerCake, Svg } from "layercake";
    import XAxis from "./_components/prob/XAxis.svelte";
    import YAxis from "./_components/prob/YAxis.svelte";

    import probData from "./_data/prob-data";

    import { scaleLinear, scaleOrdinal } from "d3-scale";

    let width = 300;
    let height = 400;
    let padding = {top: 20, right: 20, bottom: 20, left: 20};

    $: xScale = scaleLinear()
        .domain([0, 1])
        .range([0, width]);

    $: yScale = scaleLinear()
        .domain([0, 1])
        .range([height, 1]);

    $: xRange = xScale.range();
    $: yRange = yScale.range();


</script>
<div class="chart-container" bind:clientHeight={height} bind:clientWidth={width}>
<LayerCake>
    <Svg>
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
        />
    </Svg>
</LayerCake>
</div>

<style lang="sass">
    svg 
        width: 100%
        height: 100%


</style>