<script>
  import { LayerCake, Svg, Html } from 'layercake';
  import { scaleOrdinal } from 'd3-scale';
  import colorScheme from './_data/colorScheme';

  import Key from './_components/bees/Key.svelte';
  import AxisX from './_components/XAxis.svelte';
  import Beeswarm from './_components/bees/BeeswarmForce.svelte';

  // This example loads csv data as json using @rollup/plugin-dsv
  import data from './_data/bee-data';

  const xKey = 'prob';
  const zKey = 'race';
  const titleKey = 'name';

  export let activeName;

  const r = 6;

  const seriesColors = ['#9683C9', '#185ABC', '#FCE17E', '#82C995', '#F9A8A8'];


  const dataTransformed = data.map(d => {
    return {
      [titleKey]: d.race + ' ' + d.sex + " " + d.age + " " + d.year,
      ["sex"]: d.sex,
      ["age"]: d.age,
      ["year"]: d.year,
      [zKey]: d[zKey],
      [xKey]: d.prob
    }
  })

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
    height: 250px;
  }
</style>

<div class='chart-container'>
  <LayerCake
    padding={{bottom: 15}}
    x={xKey}
    z={zKey}
    zScale={scaleOrdinal()}
    zRange={seriesColors}
    data={dataTransformed}
    let:width
  >

    <Svg>
      <AxisX/>
      <Beeswarm
        r={width < 400 ? r / 1.25 : r}
        strokeWidth={1}
        xStrength={0.95}
        yStrength={0.075}
        getTitle={d => d[titleKey]}
        activeName={activeName}
      />
    </Svg>

    <Html pointerEvents={false}>
      <Key shape='circle' />
    </Html>

  </LayerCake>
</div>