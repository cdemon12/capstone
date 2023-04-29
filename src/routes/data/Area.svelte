<script>
    import { LayerCake, Svg, flatten, stack } from 'layercake';
  
    import { scaleOrdinal } from 'd3-scale';
    import { timeParse, timeFormat } from 'd3-time-format';
    import colorScheme from './_data/colorScheme';
    import { precisionFixed, format, scaleLinear, extent } from "d3";

  
    import AxisX from './_components/area/XAxis.svelte';
    import YAxis from './_components/area/YAxis.svelte';
    import AreaStacked from './_components/area/AreaStacked.svelte';
  
    // This example loads csv data as json using @rollup/plugin-dsv
    import raw from './_data/area-compare';
	import { text } from 'svelte/internal';
  
    const xKey = "y";
    const yKey = [0, 1];
    const zKey = 'key';
    const xKeyCast = timeParse('%Y');

    
  
    const seriesNames = ['white', 'black', 'asian', 'indian'];
    const seriesColors = seriesNames.map(d => colorScheme.colors[d]);

    $: width = 300;
    $: height = 300;
    $: padding={ top: 0, right: 1, bottom: 0, left: 17 }

  
    const formatTickX = d => d
    const formatTickY = d => d *100 + '%';
  
    /* --------------------------------------------
     * Cast data
     */
    const data = [
      { 
        "y": 0,
        "asian": raw.nominal[0],
        "black": raw.nominal[1],
        "indian": raw.nominal[2],
        "white": raw.nominal[3]
      },
      { "y": 1,
        "asian": raw.per_capita[0],
        "black": raw.per_capita[1],
        "indian": raw.per_capita[2],
        "white": raw.per_capita[3]
      }
    ]
        
    const stackedData = stack(data, seriesNames);

  </script>
  
  <div class="chart-container" bind:clientHeight={height} bind:clientWidth={width}>
    <LayerCake
      padding={padding}
      x={d => d.data[xKey]}
      y={yKey}
      z={zKey}
      zScale={scaleOrdinal()}
      zDomain={seriesNames}
      zRange={seriesColors}
      flatData={flatten(stackedData)}
      data={stackedData}
    >
      <Svg>
        <AreaStacked/>
        <g transform='translate(11 0)'>
          <YAxis
          formatTick={formatTickY}
          tickMarks={true}
          gridlines={true}
          xTick={0}
          textAnchor={"end"}
          ticks={3}
          />
        </g>
        <AxisX
          formatTick={formatTickX}
          tickMarks={true}
          yTick={0}
          ticks={0}
        />
        <text
          class="axis-label"
          x={width / 2}
          y={height + 20}
          text-anchor="middle"
          >
          Adjust for population
        </text>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
            refX="0" refY="3.5" orient="auto">
              <polygon points="0 0, 5 3.5, 0 7" />
            </marker>
          </defs>
          <line x1="20" y1={height + 30} x2={width - 40} y2={height + 30} stroke="#000" 
          stroke-width="2" marker-end="url(#arrowhead)" />
      </Svg>
    </LayerCake>
  </div>

  <style lang="sass">

    text
      font-family: 'Rubik', Segoe UI

    .chart-container
      width: 100%
      height: 100%
    


  </style>