<script>
// imports
    import { LayerCake, Svg, flatten, uniques, stack } from 'layercake';
    import { scaleBand, scaleOrdinal } from 'd3-scale';
    import { format, precisionFixed } from 'd3-format';
    import ColumnStacked from './_components/ColumnStacked.svelte';
    import AxisX from './_components/XAxis.svelte';
    import AxisY from './_components/YAxis.svelte';
  
// import data
    import json from './_data/slope';
    import colorScheme from './_data/colorScheme';


    let data = new Map();

    for (let d of json) {
      data[d.race] = d.nominal;
    }

    data = [data]

    const xKey = 'year';
    const yKey = [0, 1];
    const zKey = 'key';

    const seriesNames = Object.keys(data[0]);
    const seriesColors = Object.values(colorScheme);
  
    const formatTickY = d => format(`.${precisionFixed(d)}s`)(d);

    const stackedData = stack(data, seriesNames);
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
        padding={{ top: 0, right: 0, bottom: 20, left: 20 }}
        x={d => d.data[xKey]}
        y={yKey}
        z={zKey}
        xScale={scaleBand().paddingInner([0.02]).round(true)}
        xDomain={uniques(data, xKey)}
        zScale={scaleOrdinal()}
        zDomain={seriesNames}
        zRange={seriesColors}
        flatData={flatten(stackedData)}
        data={stackedData}
    >
      <Svg>
        <AxisY
          ticks={10}
          gridlines={false}
          formatTick={formatTickY}
        />
        <ColumnStacked/>
      </Svg>
    </LayerCake>
  </div>