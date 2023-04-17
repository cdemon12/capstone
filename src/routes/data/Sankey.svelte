<script lang="ts">
    import { LayerCake, Svg } from 'layercake';
  
    import Sankey from './_components/LayerCakeSankey.svelte';
  
    import data from './_data/sankey-data.js';

    export let active = 'nominal';
    export let labels: boolean;

    export let scrollY;

    let activeData = data.nominal

    $: (active == 'nominal') ? activeData = data.nominal : activeData = data.per_capita;

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
      data={activeData}
    >
      <Svg>
        <Sankey
          {active}
          {labels}
          {scrollY}
        />
      </Svg>
    </LayerCake>
  </div>