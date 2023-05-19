<!--
  @component
  Generates an SVG Beeswarm chart using a [d3-force simulation](https://github.com/d3/d3-force).
 -->
 <script>
    import { getContext } from 'svelte';
    import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force';
  
    const { data, yGet, width, zGet, xScale, xGet, custom } = getContext('LayerCake');
  
    let mappedData = $data.map((d) => ({ ...d }));
  
    /** @type {Number} [r=4] - The circle radius size in pixels. */
    export let r = 4;
  
    /** @type {Function} [strokeWidth=1] - The circle's stroke width in pixels. */
    export let strokeWidth = d => d;
  
    /** @type {String} [stroke='#fff'] - The circle's stroke color. */
    export let stroke = '#fff';
    /** @type {Number} [xStrength=0.95] - The value passed into the `.strength` method on `forceX`. See [the documentation](https://github.com/d3/d3-force#x_strength). */
    export let xStrength = 0.075;
  
    /** @type {Number} [yStrength=0.075] - The value passed into the `.strength` method on `forceY`. See [the documentation](https://github.com/d3/d3-force#y_strength). */
    export let yStrength = 0.95;
  
    /** @type {Function} [getTitle] — An accessor function to get the field on the data element to display as a hover label using a `<title>` tag. */
    export let getTitle = undefined;

    export let groupBy = false;


    const simulation = forceSimulation(mappedData)            


    let nodes = [];
    
    $: simulation.on('tick', ticked)

    function ticked() {
	    nodes = simulation.nodes();
    }

    $:{
      simulation
          .force('x', forceX().x(d => {return groupBy ? $xGet(d) + $xScale.bandwidth() / 2 : $width / 2;}).strength(yStrength))
          .force('y', forceY().y(d => $yGet(d)).strength(xStrength))
          .force('collide', forceCollide(r))
          .alpha(1.3)
          .restart();
    }

  </script>
  
  <g class='bee-group'>
    {#each nodes as node}
      <circle
        fill='{$zGet(node)}'
        stroke='{stroke}'
        stroke-width='{strokeWidth(node)}'
        cx='{node.x}'
        cy='{node.y}'
        r='{r}'
      >
        {#if getTitle}
          <title>{@html getTitle(node)}</title>
        {/if}
      </circle>
    {/each}
  </g>