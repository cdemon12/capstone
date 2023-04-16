<!--
  @component
  Generates a voronoi layer using [d3-delauney](https://github.com/d3/d3-delauney).
 -->
 <script>
    import { getContext, createEventDispatcher } from 'svelte';
    import { uniques } from 'layercake';
    import { Delaunay } from 'd3-delaunay';
  
    const { data, xGet, yGet, width, height } = getContext('LayerCake');
  
    /** @type {String} [stroke] – An optional stroke color, which is likely only useful for testing to make sure the shapes drew correctly. */
    export let stroke = undefined;
  
    let dispatcher = createEventDispatcher();

    let tooltip = {
      hovered: false,
      x: 0,
      y: 0,
      data: null
    };
  
    function mouseover(point, event) {
      tooltip = {
        hovered: true,
        x: event.clientX,
        y: event.clientY,
        data: point.data
      }
    }

    function mouseoff() {
      tooltip = {
        hovered: false,
        x: 0,
        y: 0,
        data: null
      }
    }
  
    $: points = $data.map(d => {
      const point = [$xGet(d), $yGet(d)];
      point.data = d;
      return point;
    });
  
    $: uniquePoints = uniques(points, d => d.join(), false);
  
    $: voronoi = Delaunay.from(uniquePoints).voronoi([0, 0, $width, $height]);

    $: console.log(uniquePoints)



    let colors = {
        "asian_male_minor": "#B2B6AB",
        "black_male_minor": "#9CA0B2",
        "white_male_minor": "#B6A8B6",
        "indian_male_minor": "#CABBA6",
        "asian_female_minor": "#DEE4D6",
        "black_female_minor": "#C3C8DF",
        "white_female_minor": "#E3D2E3",
        "indian_female_minor": "#FCEAD0",
        "asian_male_adult": "#869F8D",
        "black_male_adult": "#61789A",
        "white_male_adult": "#8D879F",
        "indian_male_adult": "#B1A885",
        "asian_female_adult": "#C0E4CA",
        "black_female_adult": "#8BACDD",
        "white_female_adult": "#CAC1E4",
        "indian_female_adult": "#FDF0BE"
    }
  </script>
  
  <style>
    .voronoi-cell {
      fill: none;
      stroke: none;
      pointer-events: all;
      outline: none;
    }
  
    /* Useful to testing but you'll want to disable this for production */
    .voronoi-cell:hover {
      stroke: #333 !important;
      stroke-width: 3px;
    }

    .title {
      text-transform: capitalize;
      font-weight: bold;
      font-family: halyard-display, Segoe UI;
    }

    .body {
      font-family: halyard-display, Segoe UI;
    }
  </style>
  
  {#each uniquePoints as point, i}
    <path
      style:stroke
      class="voronoi-cell"
      style="fill: {colors[point.data.race + "_" + point.data.sex + "_" + point.data.age]}"
      d={voronoi.renderCell(i)}
      on:mouseover="{() => { mouseover(point, event) }}"
      on:focus="{() => {  mouseover(point) }}"
      on:mouseleave={() => { mouseoff() }}
    ></path>
  {/each}

  {#if tooltip.hovered}
  <g>
  <rect 
  x={tooltip.x - 170} 
  y={tooltip.y - 220}
  width="220"
  height="60"
  fill="#fff"
  stroke="#333"
  stroke-width="1"
  />
      <text class="title" x={tooltip.x - 150} y={tooltip.y - 200}>
        {tooltip.data.race + " " + tooltip.data.age + " " + (tooltip.data.sex == "female" ? "Women" : "Men")}
      </text>
      <text class="body" x={tooltip.x - 150} y={tooltip.y - 185}>
        Number of cases: {tooltip.data.value}
      </text>
      <text class="body" x={tooltip.x - 150} y={tooltip.y - 170}>
        Population: {tooltip.data.pop}
      </text>
  </g>
  {/if}

