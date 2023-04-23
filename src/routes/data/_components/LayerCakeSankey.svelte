<!--
  @component
  Generates an SVG Sankey chart using [d3-sankey](https://github.com/d3/d3-sankey).
 -->
 <script lang="ts">
    import { getContext } from 'svelte';
    import * as Sankey from 'd3-sankey';
    import { draw, fade } from 'svelte/transition';
	  import { scaleLinear, stackOrderAppearance } from 'd3';
    import columnData from '../_data/column-data';
	import YAxis from './YAxis.svelte';
  import { format } from 'd3';
  import { precisionFixed } from 'd3';
	import { tweened } from 'svelte/motion';
	import { subscribe } from 'svelte/internal';
	import { writable } from 'svelte/store';
  import { colors } from '../stores';

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
  $: (active == 'per_capita') && (translateY = -633);
  $: (active == 'nominal') ? activeSum.set(sum.nominal) : activeSum.set(sum.per_capita/400);
  
  
    /** @type {Function} [colorLinks=d => 'rgba(0, 0, 0, .2)'] - A function to return a color for the links. */
    export let colorLinks = d => $colors[d.race];
  
    /** @type {Function} [colorNodes=d => '#333'] - A function to return a color for each node. */
    export let colorNodes = d => '#333';

    /** @type {Function} [colorText=d => '#263238'] - A function to return a color for each text label. */
    export let colorText = d => '#263238';
  
    /** @type {Number} [nodeWidth=5] - The width of each node, in pixels, passed to [`sankey.nodeWidth`](https://github.com/d3/d3-sankey#sankey_nodeWidth). */
    export let nodeWidth = 50;
  
    /** @type {Number} [nodePadding=10] - The padding between nodes, passed to [`sankey.nodePadding`](https://github.com/d3/d3-sankey#sankey_nodePadding). */
    export let nodePadding = 10;

    /** @type {Function} [linkSort=null] - How to sort the links, passed to [`sankey.linkSort`](https://github.com/d3/d3-sankey#sankey_linkSort). */
    export let linkSort = null //(a, b) => a.value - b.value;

    export let nodeSort = (a, b) => a.value - b.value;
  
    /** @type {Function} [nodeId=d => d.id] - The ID field accessor, passed to [`sankey.nodeId`](https://github.com/d3/d3-sankey#sankey_nodeId). */
    export let nodeId = d => d.id;
  
    /** @type {Function} [nodeAlign=d3.sankeyLeft] - An alignment function to position the Sankey blocks. See the [d3-sankey documentation](https://github.com/d3/d3-sankey#alignments) for more. */
    export let nodeAlign = Sankey.sankeyCenter;

    function range(size:number, startAt:number = 0):ReadonlyArray<number> {
        return [...Array(size).keys()].map(i => i + startAt);
    }
  

    $: sankey = Sankey.sankey()
      .nodeAlign(nodeAlign)
      .nodeWidth(nodeWidth)
      .nodePadding(nodePadding)
      .nodeId(nodeId)
      .size([$width, $height])
      .linkSort(linkSort)
      .nodeSort(nodeSort);
  
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
      if (d.id.split("_")[0] == "A") {
        returnValue = "rgba(0,0,0,0)";
      }
      if (d.id.split("_")[0] == "C") {
        returnValue = $colors[d.id.split("_")[2]];
      }
      if (d.id.split("_")[0] == "D") {
        returnValue = $colors[d.id.split("_")[3]];
      }
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

  export let scrollY: number;

  let hideWidth = tweened(0, {duration: 1000});
  // $: scrollY < 1200 && hideWidth.set(0) 
  // $: if(scrollY > 1200) {
  //     if($hideWidth === 0){
  //       hideWidth.set($width)
  //     } else {
  //       hideWidth.set(0, {delay: 1000})
  //     }
  // }

  </script>
  
  <style>
    text {
      pointer-events: none;
      font-family: halyard-display, Segoe UI;
      font-weight: 400;
      text-transform: capitalize;
      font-size: 10px;
      color: white
    }
  </style>

<g class="sankey-layer" transform='rotate(90 150 200)'>
    {#if scrollY < 1200 || scrollY > 1800}
    <g class='link-group'>
      {#each sankeyData.links as d, n}
        {#each range(Math.ceil(d.width/2)) as i}
        <path
          d={link(d)}
          fill='none'
          stroke={$colors[d.race]}
          stroke-opacity='1'
          stroke-width={0.3} 
          transform ='translate(0 {i*2 - d.width / 2 + 1})'
          />
        {/each}
      {/each}
    </g>
    {/if}
    <g class='rect-group'>
      {#each sankeyData.nodes as d, i}
      {#if d.id.split("_")[0] == "A"}
      {#each races as a}
          <rect
          x={d.x0}
          y={d.y0 + ($activeData[a].runner) * (d.y1 - d.y0)}
          height={(($activeData[a].value)) * (d.y1 - d.y0) + 1}
          width={50}
          fill={$colors[a.split("_")[0]]}
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
      {#if scrollY < 1200 || scrollY > 1800}
        <rect
        x={d.x0}
        y={d.y0}
        height={d.y1 - d.y0}
        width={50}
        fill={color(d)}
        stroke-width="2"
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
    <rect
      x={sankeyData.nodes[24].x1 + $width - $hideWidth}
      y={sankeyData.nodes[16].y0 - 60}
      height={$height + 65}
      width={$hideWidth}
      fill = "white"
    />
  </g>