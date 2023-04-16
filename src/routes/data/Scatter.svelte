<script>
    import { LayerCake, Svg, Canvas } from 'layercake';
  
    import ScatterSvg from './_components/scatter/Scatter.svg.svelte';
    import ScatterCanvas from './_components/scatter/Scatter.canvas.svelte';
    import Voronoi from './_components/scatter/Voronoi.svelte';
    import AxisX from './_components/scatter/XAxis.svelte';
    import AxisY from './_components/scatter/YAxis.svelte';

    import { precisionFixed } from 'd3';
    import { format } from 'd3';
  
    // This example loads csv data as json using @rollup/plugin-dsv
    import data from './_data/scatter-data';
  
    const xKey = 'value';
    const yKey = 'pop';
  
    data.forEach(d => {
      d[yKey] = +d[yKey];
    });
  
    const r = 3;
    const padding = 10;
    const color = '#fff';
  
    function logEvent(d) {
      console.log('dispatched event', d, d.detail);
    }
  </script>
  
  <style>
    /*
      The wrapper div needs to have an explicit width and height in CSS.
      It can also be a flexbox child or CSS grid element.
      The point being it needs dimensions since the <LayerCake> element will
      expand to fill it.
    */
    .chart-container {
      width: 100%;
      height: 100%;
    }
  </style>
  
  <div class="chart-container">
    <LayerCake
      padding={{ top: 10, right: 5, bottom: 20, left: 25 }}
      x={xKey}
      y={yKey}
      xPadding={[padding, padding]}
      yPadding={[padding, padding]}
      data={data}
    >
      <Svg>
        <AxisX
          gridlines={false}
          formatTick={d => format(`.${precisionFixed(d)}s`)(d)}
        />
        <AxisY
          gridlines={false}
          ticks={4}
          formatTick={d => format(`.${precisionFixed(d)}s`)(d)}
        />
      </Svg>
  
      <Canvas>
        <ScatterCanvas
          r={r * 1.5}
          fill={'#0cf'}
        />
      </Canvas>
  
      <Svg>
        <Voronoi
        stroke="#333"
        on:voronoi-mouseover={logEvent}
      />
        <ScatterSvg
          {r}
          fill={"black"}
        />
      </Svg>
    </LayerCake>
  </div>