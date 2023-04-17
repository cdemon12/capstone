
<script lang="ts">
  import { SvelteComponent } from 'svelte';
  import Sankey from './Sankey.svelte';
  import Slope from './Slope.svelte';
  import Key from './_components/Key.svelte';
  import colorScheme from './_data/colorScheme';
	import Bees from './Bees.svelte';
  import queryData from './_data/query-data';
  import Scatter from './Scatter.svelte';
	import MultiKey from './MultiKey.svelte';
  import probData from './_data/prob-data';
  import Prob from './Prob.svelte';

  let whiteTooltip = false;
  let x: number, y: number, scrollY: number, windowHeight: number, active: string;
  let labels: boolean = false;
  let barWidth: number = 20;

  function mouseOver(event) {
		whiteTooltip = true;
		x = event.pageX;
		y = event.pageY;
	}

  function mouseOut(event) {
    whiteTooltip = false;
  }

  let value;

  $: scrollY > 1200 ? active = 'per_capita': active = 'nominal';
  $: scrollY > 488 && scrollY < 2246 ? labels = true: labels = false;

  $: console.log(scrollY)

  let age = "minor";
  let sex = "female";
  let race = "black";
  
  let query = function(age,race,sex){
    try{return queryData
      .filter(d => d.age == age)
      .filter(d => d.race == race)
      .filter(d => d.sex == sex)
      [0].value;
    } catch {
      return 0;
    }
  }

  $: value = query(age, race, sex)

  $: activeName = {
    "race": race,
    "age": age,
    "sex": sex
  }

  let selectWidth;




</script>

<svelte:window bind:scrollY={scrollY} />

<div class="body-container">
<div class="spacer">
</div>

<div class="card first">
  <h1>Missing in the U.S. by the numbers</h1>
  <div style ="width:60px; height:2px; background-color:black"></div>
  <h4>By Cole Schnell</h4>
</div>

<div class="card second">
  <p>Over half a million Americans are reported missing every year, according to statistics collected by the FBI. That is equivalent to the population of Wyoming disapearing every year. </p>
  <p>A majority of those you go missing are <span class="race-label" style="background-color:{colorScheme["white"]}; color: black;" on:mouseover={mouseOver} on:mouseleave={mouseOut}>White<ion-icon name="help-circle-outline"></ion-icon></span>, slightly over 60% of cases.</p>
  <p>However, that is small part of the story. If the data is adjusted for population, the picture becomes more clear.</p>
</div>
{#if whiteTooltip}
<div class="tooltip" style="top: {y + 5}px; left: {x + 5}px">
  <p>The FBI includes Hispanic and non-Hispanic White Americans together in all missing persons statistics.</p>
</div>
{/if}

<div class="card third">
  <h3>Population adjustion</h3>
  <div class="slope">
    <Slope />
  </div>
  <p>After adjusting for population, <span class="race-label" style="background-color:{colorScheme["black"]};">Black American</span> are much more likely to go missing, with 784 <span class="race-label" style="background-color:{colorScheme["black"]};">Black American</span> going missing yearly per 100,000.</p>
  <p>Also, notably, after adjusting for population, <span class="race-label" style="background-color:{colorScheme["indian"]}; color: black;">American Indian women</span> also surpass <span class="race-label" style="background-color:{colorScheme["white"]}; color: black;" on:mouseover={mouseOver} on:mouseleave={mouseOut}>White Americans<ion-icon name="help-circle-outline"></ion-icon></span>, making them the third most likley to go missing along the intersection of race and sex, following <span class="race-label" style="background-color:{colorScheme["black"]};">Black women and men</span>.</p>
</div>

<div class="card forth">
  <p>Race and sex clearly contribute to who goes missing but age is the strongest indicator among the three, with 65% of missing subjects being below 18 years old. After adjusting for population, that number increases to 87%.</p>
  <div class="bar" bind:clientWidth={barWidth}>
      <div class="chunk" style="width: {barWidth * .65}px; background-color: #fbb812">
        <p>65% of cases are minors</p>
      </div>
      <div class="chunk" style="background-color: black; width: 1px"/>
      <div class="chunk" style="width: {barWidth * .35}px; background-color: LightSlateGray"></div>
  </div>
  <div class="bar" bind:clientWidth={barWidth}>
    <div class="chunk" style="width: {barWidth * .87}px; background-color: #fbb812">
      <p>87% of population-adjusted cases are minors</p>
    </div>
    <div class="chunk" style="background-color: black; width: 1px"/>
    <div class="chunk" style="width: {barWidth * .13}px; background-color: LightSlateGray"></div>
</div>
</div>

<div class="sticky-container-first" bind:clientHeight={windowHeight}>
  <div class="sankey sticky">
    <Sankey 
      {active}
      {labels}
      {scrollY}
    />  
  </div>
  {#if labels}
  <div class="key">
    <Key />
  </div>
  {/if}
</div>
</div>

<div class="sticky-container-second">

  <div class="bees">
    <Bees
    {activeName} 
    />
  </div>
  <div class="input-text">
    <select bind:value={race} style="width: {selectWidth + 15}px">
      <option value="black">Black</option>
      <option value="white">White</option>
      <option value="indian">American Indian</option>
      <option value="asian">Asian</option>
      <option value="NA">--</option>
    </select>
    <span class="select-helper" bind:clientWidth={selectWidth}>{race == "indian" ? "american indian": race}</span>
    <select bind:value={age}>
      <option value="minor">Minor</option>
      <option value="adult">Adult</option>
      <option value="NA">--</option>
    </select>
    <select bind:value={sex}>
      <option value="female">Women</option>
      <option value="male">Men</option>
      <option value="NA">--</option>
    </select>
    <p>are <b>{(value == 0) ? "insufficient data" : (value > 1) ? (Math.round(value * 100)/100) + " MORE" : (Math.round(1/value * 100)/100) + " LESS"}</b> likely to go missing relative to the average American</p>
  </div>
  <div class="prob">
      <Prob />
  </div>
  <!-- <div class="scatter">
    <Scatter />
  </div>
  <div class="multikey">
    <MultiKey />
  </div> -->
</div>


<style lang="sass">

    $detour-headline-font: Georgia
    $detour-body-font: halyard-display, Segoe UI
    $detour-orange: #fbb812

    .card
        position: absolute
        right: 50px
        width: 28%
        padding: 15px
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.5)
        z-index: 100
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        h1
            font-family: $detour-headline-font
            font-size: 2rem
            font-weight: 700
            text-align: center
        h4
            font-family: $detour-body-font
            font-size: 1rem
            font-weight: 400
            text-align: center
        p
            font-family: $detour-body-font
            font-size: 1rem
            font-weight: 400
            text-align: left
            line-height: 1.5rem
        .race-label
          white-space: nowrap
          color: white
          padding: -4px 0px 0px 0px
          border-radius: 3px
        ion-icon
          visibility: visible
          transform: translateY(0.2rem)
          margin-left: 0.2rem
        .slope
          width: 65%
          height: 120px
          margin: 0 20px
          margin-bottom: 40px
        .bar
          height: 50px
          width: 100%
          display: flex
          flex-direction: row
          justify-content: center
          align-items: center
          margin-bottom: 20px
          opacity: 0.8
          .chunk
            height: 100%
            display: flex
            flex-direction: column
            justify-content: end
            align-items: end
            p
              font-size: 0.8rem
              font-weight: 700
              margin: 0
              padding: 0
              margin-bottom: 5px
              margin-right: 5px
              text-align: right
              line-height: 0.7rem
    
    .first
      top: 40%
    .second
      top: 130%
    .third
      top: 230%
    .forth
      top: 360%


    .tooltip
        position: absolute
        background-color: white
        color: black
        border: 1.5px solid black
        padding: 0 10px
        font-family: $detour-body-font
        font-size: 1rem
        font-weight: 400
        text-align: left
        z-index: 1000
        width: 200px
    .chart
        width:  100%
        height: 100%
        margin: 0 50px

    .spacer
        height: 70px

    .sticky
        position: sticky

    .sticky-container-first
      height: 430vh
      position: relative

    .sticky-container-second
      height: 430vh
      position: relative
    
    .column
        top: 70px
        height: 389.3px
        width: 80px
        padding-top: 136.7px
        padding-bottom: 0
    
    .sankey
        top: 70px
        width: 373px
        height: 519px
        padding-top: 50px
        padding-left: 300px
        transform: scale(1.2)
    
    .bees
        position: relative
        top: 70px
        width: 80%
        height: 200px
        padding-left: 80px

    .input-text
        position: relative
        top: 250px
        width: 100%
        display: flex
        flex-direction: row
        justify-content: center
        align-items: center
        font-family: $detour-body-font
        font-size: 1.5rem
        select
          background-color: transparent // Makes the background transparent
          border: none // Removes border
          padding: 0 // Removes padding
          font-family: inherit // Inherit font family from parent element
          font-size: inherit // Inherit font size from parent element
          line-height: inherit // Inherit line height from parent element
          cursor: pointer // Change cursor to pointer on hover
        .select-helper
          position: absolute
          top: 0
          left: -9999px
          text-transform: uppercase
          font-family: $detour-body-font
          font-size: 1.5rem
    
    .scatter
        position: relative
        width: 65%
        height: 10% 
        top: 300px
        left: 5%

    .multikey
        position: relative
        width: 60%
        height: 60% 
        top: 470px
        left: 0%

    .key
      position: fixed
      top: 90%
      left: 8%
    
    .prob
      position: relative
      width: 80%
      height: 80vh
      top: 300px
      left: 10%

</style>