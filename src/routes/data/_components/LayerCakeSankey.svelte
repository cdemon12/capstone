<!--
  @component
  Generates an SVG Sankey chart using [d3-sankey](https://github.com/d3/d3-sankey).
 -->
 <script lang="ts">
    import { getContext } from 'svelte';
    import * as Sankey from 'd3-sankey';
    import colorScheme from '../_data/colorScheme';
    import { draw, fade } from 'svelte/transition';
	  import { scaleLinear, stackOrderAppearance } from 'd3';
    import columnData from '../_data/column-data';
	import YAxis from './YAxis.svelte';
  import { format } from 'd3';
  import { precisionFixed } from 'd3';
	import { tweened } from 'svelte/motion';
	import { subscribe } from 'svelte/internal';

  const { data, width, height } = getContext('LayerCake');

  export let active = 'nominal'
  export let labels: boolean;

  let nominal = {}
  let per_capita = {}
  
  let sum = {
    nominal: 0,
    per_capita: 0};

  let runner = {
    nominal: 0,
    per_capita: 0
  }

  for (let d of columnData.nominal) {
    sum.nominal += d.nominal;
    sum.per_capita += d.per_capita;
  }

  for (let d of columnData.nominal) {
    nominal[d.race + "_" + d.sex] =  {
      value: d.nominal/sum.nominal,
      runner: runner.nominal/sum.nominal,
    }
    runner.nominal += d.nominal;
  };

  for (let d of columnData.per_capita){
    per_capita[d.race + "_" + d.sex] =  {
      value: d.per_capita/sum.per_capita,
      runner: runner.per_capita/sum.per_capita,
    }
    runner.per_capita += d.per_capita;
  }

  let races = Object.keys(nominal)

  let activeData = tweened(nominal, {duration: 1000});


  let translateY = -642;
  let activeSum = tweened(sum.nominal, {duration: 1000});

  $: (active == 'nominal') && activeData.set(nominal);
  $: (active == 'per_capita') && activeData.set(per_capita);
  $: (active == 'nominal') && (translateY = -642);
  $: (active == 'per_capita') && (translateY = -629);
  $: (active == 'nominal') ? activeSum.set(sum.nominal) : activeSum.set(sum.per_capita/2);
  
  
    /** @type {Function} [colorLinks=d => 'rgba(0, 0, 0, .2)'] - A function to return a color for the links. */
    export let colorLinks = d => colorScheme[d.race];
  
    /** @type {Function} [colorNodes=d => '#333'] - A function to return a color for each node. */
    export let colorNodes = d => '#333';

    /** @type {Function} [colorText=d => '#263238'] - A function to return a color for each text label. */
    export let colorText = d => '#263238';
  
    /** @type {Number} [nodeWidth=5] - The width of each node, in pixels, passed to [`sankey.nodeWidth`](https://github.com/d3/d3-sankey#sankey_nodeWidth). */
    export let nodeWidth = 50;
  
    /** @type {Number} [nodePadding=10] - The padding between nodes, passed to [`sankey.nodePadding`](https://github.com/d3/d3-sankey#sankey_nodePadding). */
    export let nodePadding = 10;

    /** @type {Function} [linkSort=null] - How to sort the links, passed to [`sankey.linkSort`](https://github.com/d3/d3-sankey#sankey_linkSort). */
    export let linkSort = (a, b) => a.value - b.value;
  
    /** @type {Function} [nodeId=d => d.id] - The ID field accessor, passed to [`sankey.nodeId`](https://github.com/d3/d3-sankey#sankey_nodeId). */
    export let nodeId = d => d.id;
  
    /** @type {Function} [nodeAlign=d3.sankeyLeft] - An alignment function to position the Sankey blocks. See the [d3-sankey documentation](https://github.com/d3/d3-sankey#alignments) for more. */
    export let nodeAlign = Sankey.sankeyLeft;

    function range(size:number, startAt:number = 0):ReadonlyArray<number> {
        return [...Array(size).keys()].map(i => i + startAt);
    }
  

    $: sankey = Sankey.sankey()
      .nodeAlign(nodeAlign)
      .nodeWidth(nodeWidth)
      .nodePadding(nodePadding)
      .nodeId(nodeId)
      .size([$width, $height])
      .linkSort(linkSort);
  
    $: sankeyData = sankey($data);
  
    $: link = Sankey.sankeyLinkHorizontal();
  
    $: fontSize = $width <= 320 ? 8 : 12;

    $: nodeNames = sankeyData.nodes.map(d => d.id);


   $: nWidth = function(d){
    let returnValue;
    (d.id.split("_")[0] == "B") ? returnValue = "20" : returnValue =  "5"
    return returnValue
  };

  $: color = function(d){
    let returnValue;
    try {
      returnValue = (d.id.split("_")[0] == "A") ? "rgba(0,0,0,0)" : colorScheme[d.id.split("_")[1]];
    } catch
    {
      returnValue = "green"
    }
    return returnValue
  };

  let delay = function(d) {
    if (d == 'A') {
      return 0;
    }
    if (d.split("_")[0] == 'B') {
      return 1;
    }
    if (d.split("_")[0] == 'C') {
      return 2;
    }
    if (d.split("_")[0] == 'D') {
      return 3;
    }
    return 0
  }

  </script>
  
  <style>
    text {
      pointer-events: none;
      font-family: halyard-display, Segoe UI;
      font-weight: 400;
      text-transform: capitalize;
      font-size: 10px;
    }
  </style>
  ()
  <g class="sankey-layer" transform='rotate(90 150 200)'>
    <g class='link-group'>
      {#each sankeyData.links as d, n}
        {#each range(Math.round(d.width/2)) as i}
        <path
          d={link(d)}
          fill='none'
          stroke={colorLinks(d)}
          stroke-opacity='1'
          stroke-width={0.3} 
          transform ='translate(0 {i*2 - d.width / 2})'
          in:draw={{delay: 1000, duration: 2000}}
          />
        {/each}
      {/each}
    </g>
    <g class='rect-group'>
      {#each sankeyData.nodes as d, i}
      {#if d.id.split("_")[0] == "A"}
      {#each races as a}
          <rect
          x={d.x0}
          y={d.y0 + ($activeData[a].runner) * (d.y1 - d.y0)}
          height={(($activeData[a].value)) * (d.y1 - d.y0)}
          width={50}
          fill={colorScheme[a.split("_")[0]]}
          transform='scale(1, -1) translate(0, {translateY})'
          />
      {/each}
      {#if labels}
      <YAxis 
        yScale = {scaleLinear().domain([$activeSum, 0]).range([d.y0, d.y1])} 
        xRange={[0,$activeSum]} 
        padding={{top: 0, left: 0, right: 0, bottom: 0}}
        gridlines={false}
        ticks={2}
        tickMarks={true}
        yTick={14}
        xTick={3}
        formatTick={d => format(`.${precisionFixed(d)}s`)(d)}
        />
        <YAxis 
        yScale = {scaleLinear().domain([100, 0]).range([d.y0, d.y1])} 
        xRange={[0,100]} 
        padding={{top: 0, left: -44, right: 0, bottom: 0}}
        gridlines={false}
        ticks={5}
        tickMarks={true}
        yTick={8}
        xTick={2}
        formatTick={d => d + "%"}
        />
      {/if}
      {:else}
      {#if labels}
        <rect
        x={d.x0}
        y={d.y0}
        height={d.y1 - d.y0}
        width={50}
        fill={color(d)}
        stroke= {d.id.split("_")[2] == "female" ? "Tomato" : "black"}
        stroke-width="2"
        stroke-dasharray={d.id.split("_")[0] == "D" && d.id.split("_")[3] == "minor" ? ("3,3") : ("0,0")}
        />
      {:else}
        <rect
        x={d.x0}
        y={d.y0}
        height={d.y1 - d.y0}
        width= {50}
        fill={color(d)}
        />
      {/if}
      {/if}
      <g
      transform='rotate(-40, {d.x0 < $width / 4 ? d.x1 + 6 : d.x0 - 6}, {(d.y1 + d.y0) / 2})'
      >
        <!-- <text
          x={d.x0 < $width / 4 ? d.x1 + 6 : d.x0 - 6}
          y={(d.y1 + d.y0) / 2}
          dy="{(fontSize / 2) - 2}"
          style="fill: {colorText(d)};
                text-anchor: {d.x0 < $width / 4 ? 'start' : 'end'};">
          {[d.id.split("_")[2], d.id.split("_")[3]].join(" ")}
        </text> -->
      </g>
      {/each}
    </g>
  </g>