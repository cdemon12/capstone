<script lang="ts">

    import { scaleLinear } from "d3";
    import { extent } from "d3-array"; 
    import colorScheme from "../_data/colorScheme";
    
    export let data;
    export let width;
    export let height;


    $: xScale = scaleLinear()
        .domain([0, 1])
        .range([0, width]);
    $: nominalScale = scaleLinear()
        .domain(extent(data, d => d.nominal))
        .range([height, 0]);
    $: perCapitaScale = scaleLinear()
        .domain(extent(data, d => d.per_capita))
        .range([height, 0]);



</script>


{#each data as d}
<line 
x1 = {xScale(0)}
x2 = {xScale(1)}
y1 = {nominalScale(d.nominal)}
y2 = {perCapitaScale(d.per_capita)}
stroke = {colorScheme[d.race]}
stroke-width = "2"
/>
{/each}