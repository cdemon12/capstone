<script>
    import { LayerCake, Svg, Html } from 'layercake';
    import { scaleBand, scaleOrdinal } from 'd3-scale';
  
    import Key from './Key.html.svelte';
    import AxisY from './AxisY.svelte';
    import Beeswarm from './BeeswarmForce.svelte';
  
    // This example loads csv data as json using @rollup/plugin-dsv
    import data from '../_data/data';
  
    const yKey = 'relative_risk';
    export let groupBy;
    export let xKey;
    export let zKey;
    export let year;
    export let hovered;
    const titleKey = 'name';
  
    const r = 8;
  
    const seriesColors = ['#9683C9', '#185ABC', '#FCE17E', '#82C995', '#F9A8A8'];

    const dataTransformed = data[year].breakdown.map(d => {
            return {
            [titleKey]: "Race: " + d.race + '&#xA;Sex: ' + d.sex + '&#xA;Age: ' + d.age + '&#xA;Relative risk: ' + Math.round(d.relative_risk*100)/100,
            ["sex"]: d.sex,
            ["age"]: d.age,
            ["race"]: d.race,
            ["year"]: d.year,
            ["cases"]: d.cases_percent,
            [zKey]: d[zKey],
            [yKey]: d.relative_risk
            }
        });

  
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
  
  <div class='chart-container'>
    <LayerCake
      padding={{bottom: 15}}
      y={yKey}
      z={zKey}
      x={xKey}
      zScale={scaleOrdinal()}
      xScale={scaleBand()}
      zRange={seriesColors}
      data={dataTransformed}
      custom={{hovered}}
      let:width
      let:height
    >
  
      <Svg>
        <AxisY
        ticks={7}
        {groupBy}
        {xKey}
        />
        <Beeswarm
          r={width < 400 ? r / 1.25 : r}
          strokeWidth={d => d.race === hovered.race && d.sex === hovered.sex && d.age === hovered.age ? 3 : 0}
          xStrength={0.95}
          yStrength={0.075}
          getTitle={d => d[titleKey]}
          groupBy={groupBy}
        />
      </Svg>
  
      <Html pointerEvents={false}>
        <Key 
            shape='circle'
            align='center'
            lookup={{'black': 'Black', 'white': 'White', 'indian': 'American Indian', 'asian': 'Asian', 'all': 'All', 'male': 'Male', 'female': 'Female', 'minor':'Minor (> 18)', 'adult': 'Adult (≤ 18)'}}
            />
      </Html>
  
    </LayerCake>
  </div>