<script lang="ts">
	// https://github.com/topojson/us-atlas
	// https://github.com/d3/d3-geo
	// https://observablehq.com/@mbostock/u-s-state-map
	// TODO: https://observablehq.com/@d3/u-s-map
	// TODO: https://observablehq.com/@jeantimex/us-state-county-map
	
	import { onMount } from 'svelte';
	import * as topojson from 'topojson-client';
	import { geoPath, geoAlbersUsa } from 'd3-geo';
	import { draw } from 'svelte/transition';
    import {
    forceSimulation,
    forceX,
    forceY,
    forceManyBody,
    forceCollide,
    forceCenter,
    } from 'd3-force';
	import { writable } from 'svelte/store';
	import namus from './_data/namus';
	import mapData from './_data/map-data';
	import colorScheme from './_data/colorScheme';
	
	// https://github.com/topojson/us-atlas#us-atlas-topojson
	const projection = geoAlbersUsa().scale(1300).translate([487.5, 305])
	
	const path = geoPath().projection(null);
	
	let states = [];
	let counties = []
	let mesh;
	let selected;
	//$: console.log({ selected })

	// const points: {race: string, projection: [number, number]}[] = []

	// namus.forEach(p => p.long && p.lat ? projection([p.long, p.lat]) !== null ? points.push({race: p.race_ethnicity, projection: projection([p.long, p.lat])}) : null : null)
	
    // const initialNodes = points

	// const simulation = forceSimulation(initialNodes)
    //     .force("collision", forceCollide().radius(d => 0.5))
	// 	.force("x", forceX().x(d => d.projection[0]))
	// 	.force("y", forceY().y(d => d.projection[1]))
	// 	.on("tick", ticked);

	// let nodes = simulation.nodes();
	// function ticked() {
	// 	nodes = simulation.nodes();
	// 	console.log(nodes)
	// }

    let width: number;
    let height: number;

	onMount(async () => {
		const us = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json')
			.then(d => d.json())
		// console.log({ us })
		
		states = topojson.feature(us, us.objects.states).features;
		// console.log({ features })
		
		counties = topojson.feature(us, us.objects.counties).features;

		mesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
	})
</script>
<div bind:clientHeight={height} bind:clientWidth={width}>
<svg viewBox="0 0 975 610">
	<!-- State shapes -->
	<g fill="none" stroke="white">
		{#each states as feature, i}
			<path d={path(feature)} class="state" />
		{/each}
    
        {#each mapData as point}
        <circle
          class='node'
          r={0.5}
          fill= {point.race == "White / Caucasian" ? colorScheme.colors.white : point.race == "Black / African American" ? colorScheme.colors.black : point.race == "Hispanic / Latino" ? "Maroon" : point.race == "American Indian / Alaska Native" ? colorScheme.colors.indian : point.race == "Asian" ? colorScheme.colors.asian : "Black"}
          stroke="none"
          stroke-width="none"
          cx='{point.x}'
          cy='{point.y}'
        >
          <!-- <title>{point[$custom.title]}</title> -->
        </circle>
        {/each}

	</g>
</svg>
</div>
	
<style>

</style>