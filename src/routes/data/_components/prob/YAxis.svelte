<!--
  @component
  Generates an SVG y-axis. This component is also configured to detect if your y-scale is an ordinal scale. If so, it will place the markers in the middle of the bandwidth.
 -->
 <script lang="ts">
    export let padding: { top: number; right: number; bottom: number; left: number};
    export let xRange;
    export let yScale;

    let names = {
      0: "All unknown",
      1: "Race",
      2: "Sex",
      3: "Age",
      4: "Race & Sex",
      5: "Race & Age",
      6: "Sex &  Age",
      7: "Race & Sex & Age"
    }
  
    /** @type {Boolean} [gridlines=true] - Extend lines from the ticks into the chart space */
    export let gridlines = true;
  
    /** @type {Boolean} [tickMarks=false] - Show a vertical mark for each tick. */
    export let tickMarks = false;
  
    /** @type {Function} [formatTick=d => d] - A function that passes the current tick value and expects a nicely formatted value in return. */
    export let formatTick = d => d == 0 ? names[d] : "+ " + names[d];
  
    /** @type {Number|Array|Function} [ticks=4] - If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return. */
    export let ticks = 7;
  
    /** @type {Number} [xTick=0] - How far over to position the text marker. */
    export let xTick = xRange[1] + 10;
  
    /** @type {Number} [yTick=0] - How far up and down to position the text marker. */
    export let yTick = 17;
  
    /** @type {Number} [dxTick=0] - Any optional value passed to the `dx` attribute on the text marker and tick mark (if visible). This is ignored on the text marker if your scale is ordinal. */
    export let dxTick = 0;
  
    /** @type {Number} [dyTick=-4] - Any optional value passed to the `dy` attribute on the text marker and tick mark (if visible). This is ignored on the text marker if your scale is ordinal. */
    export let dyTick = -4;
  
    /** @type {String} [textAnchor='start'] The CSS `text-anchor` passed to the label. This is automatically set to "end" if the scale has a bandwidth method, like in ordinal scales. */
    export let textAnchor = 'end';
  
    $: isBandwidth = typeof yScale.bandwidth === 'function';
  
    $: tickVals = Array.isArray(ticks) ? ticks :
      isBandwidth ?
        yScale.domain() :
        typeof ticks === 'function' ?
          ticks(yScale.ticks()) :
            yScale.ticks(ticks);
  </script>
  
  <g class='axis y-axis' transform='translate({-padding.left}, 0)'>
    {#each tickVals as tick (tick)}
      <g class='tick tick-{tick}' transform='translate({xRange[0] + (isBandwidth ? padding.left : 0)}, {yScale(tick)})'>
        {#if gridlines !== false}
          <line
            class="gridline"
            x2='100%'
            y1={(isBandwidth ? (yScale.bandwidth() / 2) : 0)}
            y2={(isBandwidth ? (yScale.bandwidth() / 2) : 0)}
          ></line>
        {/if}
        {#if tickMarks === true}
          <line
            class='tick-mark'
            x1='0'
            x2='{isBandwidth ? -6 : 6}'
            y1={(isBandwidth ? (yScale.bandwidth() / 2) : 0)}
            y2={(isBandwidth ? (yScale.bandwidth() / 2) : 0)}
          ></line>
        {/if}
        <text
          x='{xTick}'
          y='{(isBandwidth ? (yScale.bandwidth() / 2) + yTick : yTick)}'
          dx='{isBandwidth ? -9 : dxTick}'
          dy='{isBandwidth ? 4 : dyTick}'
          style="text-anchor:{isBandwidth ? 'end' : textAnchor};"
        >{formatTick(tick)}</text>
      </g>
    {/each}
  </g>
  
  <style>
    .tick {
      font-size: .8em;
      font-weight: 600;
      font-family: 'Rubik', Segoe UI;
    }
  
    .tick line {
      stroke: #aaa;
    }
    .tick .gridline {
      stroke-dasharray: 2;
    }
  
    .tick text {
      fill: #666;
    }
  
    .tick.tick-0 line {
      stroke-dasharray: 0;
    }
  </style>