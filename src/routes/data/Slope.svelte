<script lang=ts>
     import data from "./_data/slope";
     import { Html, LayerCake, Svg } from "layercake";
     import Slope from "./_components/Slope.svelte";
     import YAxis from "./_components/slope/YAxis.svelte";
     import XAxis from "./_components/slope/XAxis.svelte";
     import { precisionFixed, format, scaleLinear, extent } from "d3";

    $: width = 300;
    $: height = 1000;

    $: padding={ top: 7, right: 10, bottom: 20, left: 25 }

    const formatTickY = d => format(`.${precisionFixed(d)}s`)(d);

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

<div class="chart-container" bind:clientHeight={height} bind:clientWidth={width}>
  <LayerCake>
    <Svg>
    <g transform={`translate(${20}, 0)`}>
      <YAxis
        padding={padding}
        yScale={nominalScale}
        ticks={4}
        formatTick={formatTickY}
        textAnchor={"end"}
        yTick={7}
        xTick={-3}
      />
    </g>
      <g transform={`translate(${width + 25}, 0)`}>
      <YAxis
      padding={padding}
      yScale={perCapitaScale}
      ticks={4}
      formatTick={formatTickY}
      textAnchor={"start"}
      yTick={7}
      xTick={8}
    />
    </g>
    <XAxis
    padding={padding}
    xScale={xScale}
    ticks={1}
    yRange={[0, height]}
    width={width}
    height={height}
    />
      <Slope
      {data}
      {width}
      {height}/>
    </Svg>
  </LayerCake>
</div>

<style lang="sass">

    .chart-container
        width:  100%
        height: 100%


</style>
