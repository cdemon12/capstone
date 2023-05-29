
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
	import Map from './Map.svelte';
  import Area from './Area.svelte';
  import Search from './search/Search.svelte';
	import { colors } from './stores';
  import { tweened } from 'svelte/motion';
	import { color, csvParse } from 'd3';
  import { fade } from 'svelte/transition';
  import MapKey from './_components/map/Key.svelte';
  import ReadNext from '../_components/ReadNext.svelte';



  let whiteTooltip = false;
  let x: number, y: number, scrollY: number, windowHeight: number, active: string;
  let labels: boolean = false;
  let barWidth: number = 20;
  let headerHeight: number = 0;

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
    "sex": sex,
    "year": "all"
  }

  let selectWidth;

  $: {
      if (scrollY < headerHeight){
        colors.set(colorScheme.grays)
        labels = false;
      }
      if (scrollY > headerHeight && scrollY < 1200){
        labels = true;
      colors.set(
        {
          "black": colorScheme.colors.black,
          "white": colorScheme.colors.white,
          "indian": colorScheme.colors.indian,
          "asian": colorScheme.colors.asian,
          "female": colorScheme.grays.female,
          "male": colorScheme.grays.male,
          "minor": colorScheme.grays.minor,
          "adult": colorScheme.grays.adult,
        }
      )
    }
  }

  
  let colorsRaceSex = {
      "black": colorScheme.colors.black,
      "white": colorScheme.colors.white,
      "indian": colorScheme.colors.indian,
      "asian": colorScheme.colors.asian,
      "female": colorScheme.colors.female,
      "male": colorScheme.colors.male,
      "minor": colorScheme.grays.minor,
      "adult": colorScheme.grays.adult,
    }

    let colorsAge = {
      "black": colorScheme.grays.black,
      "white": colorScheme.grays.white,
      "indian": colorScheme.grays.indian,
      "asian": colorScheme.grays.asian,
      "female": colorScheme.grays.female,
      "male": colorScheme.grays.male,
      "minor": colorScheme.colors.minor,
      "adult": colorScheme.colors.adult,
    }

  let buttons = {
    "race":["all races", "black", "white", "asian", "indian"], 
    "sex": ["all sexes", "male", "female"], 
    "age": ["all ages", "minor", "adult"],
    "year": ["all years", "2022", "2021", "2020"]}

    let debug = true;
</script>

<svelte:window bind:scrollY={scrollY} />

{#if false}
<div class="debug"> 
  <p>scrollY: {scrollY}</p>
  <p>active: {active}</p>
  <p>labels: {labels}</p>
  <p>headerHeight: {headerHeight}</p>
  <p>colors: {scrollY > headerHeight}</p>
  <button on:click={() => debug = false} style="cursor: pointer;">close</button>
</div>
{/if}

<div class="body-container">
  <div class="header" bind:clientHeight={headerHeight}>
    <h1>What missing persons cases reveal about racism</h1>
    <p class="byline">By <a href="/team/cole">Cole Schnell</a> and <a href="/team/kristin">Kristin Kuchno</a>, May 20, 2023</p>
    <div class="para" style="padding-top: 10px; padding-bottom: 0">
    <p class="body">David Robinson didn’t know he would still be searching nearly two years after he drove across the country to find his missing son.</p>
    <p class="body">Daniel Robinson is one of about half a million who go missing in the U.S. every year.</p>
    <p class="body">“My faith is that I’m gonna find my son alive,” David Robinson said.</p>
    </div>
  </div>
<div class="sticky-container">
  <div class="sticky slide">
  <div class="chart">
    <Sankey 
      {active}
      {labels}
      {scrollY}
    />  
  </div>
  <div class="key">
    <Key />
  </div>
  {#if scrollY > 900 && scrollY < 1200}
    <div in:fade out:fade class="card" style="border: 2px solid {colorScheme.colors.black}; position: fixed; left: 70%; top: 175px; width: 400px">
      <p class="body">Over the last three years, 552,835 <span class="race-label" style="background-color:{colorScheme.colors["black"]};">Black Americans</span> were reported missing to the FBI.</p>
    </div>
  {/if}
  {#if scrollY > 950 && scrollY < 1200}
  <div in:fade out:fade class="card" style="border: 2px solid {colorScheme.colors.white}; position: fixed; left: 30%; top: 370px; width: 400px">
    <p class="body">Over the same time period, 939,191 <span class="race-label" style="background-color:{colorScheme.colors["white"]};">White Americans</span> were reported missing to the FBI.</p>
  </div>
  {/if}
  {#if scrollY > 2000 && scrollY < 2300}
  <div in:fade out:fade class="card" style="border: 2px solid {colorScheme.colors.black}; position: fixed; left: 70%; top: 175px; width: 400px">
    <p class="body">Every year, about 3.8 <span class="race-label" style="background-color:{colorScheme.colors["black"]};">Black Americans</span> per 1,000 <span class="race-label" style="background-color:{colorScheme.colors["black"]};">Black Americans</span> are reported as missing.</p>
  </div>
  {/if}
  {#if scrollY > 2050 && scrollY < 2300}
  <div in:fade out:fade class="card" style="border: 2px solid {colorScheme.colors.white}; position: fixed; left: 30%; top: 370px; width: 400px">
    <p class="body">For <span class="race-label" style="background-color:{colorScheme.colors["white"]};">White Americans</span>, that number is about 1.2 per 1,000.</p>
  </div>
  {/if}
  {#if scrollY > 2300 && scrollY < 2600}
  <div style="visibility: hidden; display: none">{colors.set(colorsRaceSex)}</div>
  <div in:fade out:fade class="card" style="border: 2px solid {colorScheme.colors.indian}; position: fixed; left: 25%; top: 150px; width: 400px">
    <p class="body">When also sorted by sex, American Indian women surpass White Americans, making them the third most likely to go missing along the intersection of race and sex, following Black women and men. </p>
  </div>
  {/if}
  {#if scrollY > 2400 && scrollY < 2600}
  <div in:fade out:fade class="card" style="border: 2px solid {colorScheme.colors.indian}; position: fixed; left: 70%; top: 360px; width: 400px">
    <p class="body">
      Unlike other cases, American Indian disappearances are typically related to violent crimes, with murder being the third most common death for Indian women, according to the Urban Indian Health Institute. This phenomenon sparked activism, leading to the unanimous passage of the Not Invisible Act in 2019.
      </p>
  </div>
  {/if}
  {#if scrollY > 2600 && scrollY < 2900}
  <div in:fade out:fade class="card" style="border: 2px solid {colorScheme.colors.indian}; position: fixed; left: 48%; top: 370px; width: 400px">
    <p class="body">
      “There is still much work to do to combat the epidemic of missing and murdered Indigenous women and girls,” Co-sponsor Senator Catherine Cortez Masto (D-NV) said after the bill was extended in late 2022.
    </p>
  </div>
  {/if}
  {#if scrollY > 2900 && scrollY < 3200}
  <div style="visibility: hidden; display: none">{colors.set(colorsAge)}</div>
  <div in:fade out:fade class="card" style="border: 2px solid {colorScheme.colors.minor}; position: fixed; left: 48%; top: 340px; width: 400px">
    <p class="body">
      Adding age reveals the largest disparity, children are 65% of cases before adjusting for the much larger adult population; after population adjustment, 87% of cases are younger than 18.    
     </p>
  </div>
  {/if}
  {#if scrollY > 3200 && scrollY < 3400}
  <div style="visibility: hidden; display: none">{colors.set(colorScheme.colors)}</div>
  {/if}
  </div>
</div>
<div class="card">
  <p class="body first-paragraph">Though less than one percent of those are missing long term, Black Americans are more likely to be missing and for longer.</p>
  <p class="body">For Black children, even more often and longer.</p>
  <p class="body">The lack of resources for Black Americans leaves many families with few options to find their loved ones.</p>
</div>
<div class="card" style="top: 1800px; flex-direction: row; align-items:center;">
  <div class="slope" style="width: 300px; height: 250px; padding-bottom: 50px; padding-right: 20px">
    <Area />
  </div>
  <p style="width: 200px;">There 210 million more <span class="race-label" style="background-color:{colorScheme.colors["white"]};">White Americans</span> than <span class="race-label" style="background-color:{colorScheme.colors["black"]};">Black Americans</span>. So, to see the full picture, the data needs to be adjust for population.</p>
  <!-- <p>Also, notably, after adjusting for population, <span class="race-label" style="background-color:{colorScheme["indian"]}; color: black;">American Indian women</span> also surpass <span class="race-label" style="background-color:{colorScheme["white"]}; color: black;" on:mouseover={mouseOver} on:mouseleave={mouseOut}>White Americans<ion-icon name="help-circle-outline"></ion-icon></span>, making them the third most likley to go missing along the intersection of race and sex, following <span class="race-label" style="background-color:{colorScheme["black"]};">Black women and men</span>.</p> -->
</div>
<div class="para">
  <p class="body">Missing children are more likely to be found and missing for a shorter period than adults, with 99.5% of missing children being found, according to a 2018 study on missing children cases in New York. However, the study found that Black children are over twice as likely not to be found and more likely to be missing for longer.</p>
  <p class="body">When police reports are filed for missing children of color, it’s usually assumed that they’re runaways, said Derrica Wilson, who co-founded The Black and Missing Foundation to address disparities in missing persons.</p>
  <p class="body">When adults of color go missing, they’re labeled as criminals. These stereotypes have a dehumanizing and desensitizing effect, she said.</p>
  <p class="body">David Robinson asked the vice president of the Arizona West Valley NAACP to join him in his initial meeting with Buckeye police.</p>
  <p class="body">“The lack of sympathy, empathy, respect that they gave David on that day, it was horrible,” Larnell Farmer said.</p>
  <p class="body">Being Black changes the number of resources used to search. For instance, if a child is labeled as a runaway, the police can’t issue an AMBER alert, one of the most successful tools in abduction cases.</p>
  <p class="body">When law enforcement isn’t enough, the FBI can provide additional resources or if warranted, open a federal investigation. Federal investigations are often limited to missing children; even then, there are few, leaving families with very little help beyond local law enforcement.</p>
  <p class="body">Stereotypes of runaways and criminals are also relayed into less media coverage. According to a 2015 study of media coverage of missing children, 9% of media missing children mentions involving Black children, despite Black children being 36% of cases.
  <p class="body">“When a person of color goes missing, it’s barely reported in the local news,” said Bishop Holt, president of the local NAACP chapter. “So the question is, is one life better than another? Or is one life more valuable than another?”</p>
  <p class="body">Examining sex, age and race alone doesn’t reveal the full disparities in missing person cases. Intersectionality is when there is an additional effect beyond the combined effects of separate characteristics. These intersectional effects are very present in missing persons.</p>
  <p class="body">For instance, within the population of Black minors in 2022, 6.85 times more people went missing per person than the general population. That is more missing persons per person than the number of missing persons per person in the populations of both minors and black people, revealing an additional intersectional risk from being a minor and Black.</p>
  <p class="body">Choose different characteristics to see how intersections effect the number of people who go missing:</p>
</div>
  <div class="bees">
    <Bees
    {activeName} 
    />
  </div>
  <div class="directions">
    <p>Select at least two demographic characteristics:</p>
  </div>
  <div class="btn-container-container">
  <div class="btn-container">
    {#each Object.keys(buttons) as key}
      <div class="btn-group">
        {#each buttons[key] as item}
          <button class="btn" style="opacity:{activeName[key] == item.split(" ")[0] ? 1 : 0.5}; border: {activeName[key] == item.split(" ")[0] ? "1px solid white" : "none"}" on:click={() => {activeName[key] = item.split(" ")[0]}}>{item == "indian" ? "american indian" : item}</button>
        {/each}
      </div>
    {/each}
  </div>
  </div>
  <div class="para">
    <p class="body">
      “There are many Daniel Robinson and David Robinson situations going on in this country,” Holt said. “And unless it’s heard by family members who are going through this, everybody feels alone.”    
    </p>
    <p class="body">
      The map below represents all active missing persons cases in the NamUs database. Every dot represents an active case. This map is to represent the sheer size of active cases and not an accurate measure of where people go missing.
    </p>
  </div>
  <div class="map">
    <Map />
  </div>
  <div class="key">
    <MapKey />
  </div>
    <div class="search">
      <Search />
    </div>

  <div class="para">
      <h3>Notes</h3>
      <p class="body">
        Read the <a href="/">methodolgy</a>.
      </p>
      <p class= "body">
        To report an error or suggest an edit, email <a href="mailto:coloeschnell@gmail.com">coleschnell@gmail.com.</a>
      </p> 
      <p class="body">
        This article takes some visual inspiration by <a href="https://projects.propublica.org/coronavirus-unemployment/">What Coronavirus Job Losses Reveal About Racism in America,"</a> by Lena V. Groeger at ProPublica.
      </p>  
      <p class="body">
        The data for this article was collected from the FBI, NamUs, and the U.S. Census Bureau.
      </p>
  </div>

  <ReadNext />

</div>

<!-- <div class="card second">
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
  <div class="slope">
    <Area />
  </div>
  <p>After adjusting for population, <span class="race-label" style="background-color:{colorScheme["black"]};">Black American</span> are much more likely to go missing, with 784 <span class="race-label" style="background-color:{colorScheme["black"]};">Black American</span> going missing yearly per 100,000.</p>
  <p>Also, notably, after adjusting for population, <span class="race-label" style="background-color:{colorScheme["indian"]}; color: black;">American Indian women</span> also surpass <span class="race-label" style="background-color:{colorScheme["white"]}; color: black;" on:mouseover={mouseOver} on:mouseleave={mouseOut}>White Americans<ion-icon name="help-circle-outline"></ion-icon></span>, making them the third most likley to go missing along the intersection of race and sex, following <span class="race-label" style="background-color:{colorScheme["black"]};">Black women and men</span>.</p>
</div>

<div class="card forth">
  <p>Race and sex clearly contribute to who goes missing but age is the strongest indicator among the three, with 65% of missing subjects being below 18 years old. After adjusting for population, that number increases to 87%.</p>
  <div class="bar" bind:clientWidth={barWidth}>
      <div class="chunk" style="width: {barWidth * .66}px; background-color: #fbb812">
        <p>66% of cases are minors</p>
      </div>
      <div class="chunk" style="background-color: black; width: 1px"/>
      <div class="chunk" style="width: {barWidth * .34}px; background-color: LightSlateGray"></div>
  </div>
  <div class="bar" bind:clientWidth={barWidth}>
    <div class="chunk" style="width: {barWidth * .86}px; background-color: #fbb812">
      <p>86% of population-adjusted cases are minors</p>
    </div>
    <div class="chunk" style="background-color: black; width: 1px"/>
    <div class="chunk" style="width: {barWidth * .14}px; background-color: LightSlateGray"></div>
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
  <div class="map">
      <Map />
  </div>
  <div class="search">
    <Search />
  </div> -->
  <!-- <div class="scatter">
    <Scatter />
  </div>
  <div class="multikey">
    <MultiKey />
  </div> -->
<!-- </div>
// FAQ
</div> -->


<style lang="sass">

    $detour-headline-font: Georgia
    $detour-body-font: 'Rubik', Segoe UI
    $detour-orange: #fbb812

    a
      color: white
      &:hover
        color: $detour-orange


    .debug
      position: fixed
      top: 0
      left: 0
      z-index: 10001
      background-color: white
      color: black
      font-family: monospace
      font-size: 12px
      padding: 10px
      border: 1px solid black
      border-radius: 5px
      box-shadow: 0 0 10px rgba(0,0,0,0.5)

    .body-container
      position: relative
      width: 100%
      padding-top: 50px
      background-color: #282729
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      gap: 20px
      .header
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        gap: 10px
      h1
        font-family: $detour-headline-font
        font-size: 4rem
        font-weight: 700
        text-align: center
        color: white
        width: min(80%, 700px)
        margin: 0
        padding: 0
        text-shadow: 0 10px 10px rgba(0,0,0,0.5)
        padding-top: 50px
      p
        font-family: $detour-body-font
        font-size: 1.1rem
        font-weight: 400
        margin: 0
        padding: 0
      .byline 
        font-style: italic
        text-align: center
        font-size: 1.05 rem
        color: white
        a
          color: white
          text-decoration: underline
          &:hover
            color: $detour-orange
      .body
        text-align: left
      .para
        font-family: $detour-body-font
        font-size: 1.1rem
        font-weight: 400
        margin: 0
        padding: 0 0 20px 0
        color: white
        width: min(80%, 700px)
        text-align: left
        line-height: 1.5
        display: flex
        flex-direction: column
        gap: 20px
      h3
        margin: 0

    .sticky-container
      width: 100%
      height: 3650px
      position: relative
      top: 0
      left: 0
      display: flex
      flex-direction: column
      align-items: center
      justify-content: start
      .sticky
        position: sticky
        top: 90px
        left: 0
      .chart
        width: 373px
        height: 519px
        padding-left: 230px
        transform: scale(1.2)
        z-index: 0
      .key
        transform: translateY(-40px)



    .card
        position: absolute
        left: 50%
        top: 900px
        transform: translateX(-50%)
        width: min(50%, 500px)
        padding: 30px
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.5)
        z-index: 100
        display: flex
        flex-direction: column
        justify-content: start
        align-items: start
        background-color: white
        gap: 10px
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
            font-size: 1.1rem
            font-weight: 400
            text-align: left
            line-height: 1.5rem
        .race-label
          white-space: nowrap
          color: white
          padding: -4px 0px 0px 0px
          border-radius: 3px


  .bees
    position: relative
    width: 80%
    height: 120px
    left: 0
    padding: 10px 10% 130px 10%

  .directions
    color: #666
    padding: 0
    margin: 0

  .map
    position: relative
    width: 70%

  .search
    padding-top: 20px
    position: relative
    width: 100%

  .btn-container-container
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    width: 100%
    .btn-container
      display: flex
      flex-direction: row
      align-items: center
      justify-content: center
      gap: 20px
      padding-bottom: 20px
      .btn-group
        display: flex
        flex-direction: column
        justify-content: start
        align-items: start
        gap: 5px
        flex-wrap: wrap
        height: 170px
        .btn
          font-family: $detour-body-font
          font-size: 1rem
          font-weight: 400
          text-align: left
          color: white
          background-color: black
          width: 130px
          border: none
          border-radius: 3px
          opacity: 0.5
          cursor: pointer
          text-transform: capitalize


    //     ion-icon
    //       visibility: visible
    //       transform: translateY(0.2rem)
    //       margin-left: 0.2rem
    //     .slope
    //       width: 65%
    //       height: 200px
    //       margin: 20px 20px
    //     .bar
    //       height: 50px
    //       width: 100%
    //       display: flex
    //       flex-direction: row
    //       justify-content: center
    //       align-items: center
    //       margin-bottom: 20px
    //       opacity: 0.8
    //       .chunk
    //         height: 100%
    //         display: flex
    //         flex-direction: column
    //         justify-content: end
    //         align-items: end
    //         p
    //           font-size: 0.8rem
    //           font-weight: 700
    //           margin: 0
    //           padding: 0
    //           margin-bottom: 5px
    //           margin-right: 5px
    //           text-align: right
    //           line-height: 0.7rem
    
    // .first
    //   top: 40%
    // .second
    //   top: 130%
    // .third
    //   top: 230%
    // .forth
    //   top: 360%


    // .tooltip
    //     position: absolute
    //     background-color: white
    //     color: black
    //     border: 1.5px solid black
    //     padding: 0 10px
    //     font-family: $detour-body-font
    //     font-size: 1rem
    //     font-weight: 400
    //     text-align: left
    //     z-index: 1000
    //     width: 200px
    // .chart
    //     width:  100%
    //     height: 100%
    //     margin: 0 50px

    // .spacer
    //     height: 70px

    // .sticky
    //     position: sticky

    // .sticky-container-first
    //   height: 430vh
    //   position: relative

    // .sticky-container-second
    //   height: 430vh
    //   position: relative
    
    // .column
    //     top: 70px
    //     height: 389.3px
    //     width: 80px
    //     padding-top: 136.7px
    //     padding-bottom: 0
    
    // .sankey
    //     top: 70px
    //     width: 373px
    //     height: 519px
    //     padding-top: 50px
    //     padding-left: 300px
    //     transform: scale(1.2)
    


    // .input-text
    //     position: relative
    //     top: 150px
    //     width: 100%
    //     display: flex
    //     flex-direction: row
    //     justify-content: center
    //     align-items: center
    //     font-family: $detour-body-font
    //     font-size: 1.5rem
    //     background-color: white
    //     select
    //       background-color: transparent // Makes the background transparent
    //       border: none // Removes border
    //       padding: 0 // Removes padding
    //       font-family: inherit // Inherit font family from parent element
    //       font-size: inherit // Inherit font size from parent element
    //       line-height: inherit // Inherit line height from parent element
    //       cursor: pointer // Change cursor to pointer on hover
    //     .select-helper
    //       position: absolute
    //       top: 0
    //       left: -9999px
    //       text-transform: uppercase
    //       font-family: $detour-body-font
    //       font-size: 1.5rem
    
    // .scatter
    //     position: relative
    //     width: 65%
    //     height: 10% 
    //     top: 300px
    //     left: 5%

    // .multikey
    //     position: relative
    //     width: 60%
    //     height: 60% 
    //     top: 470px
    //     left: 0%

    // .key
    //   position: fixed
    //   top: 90%
    //   left: 8%
    
    // .prob
    //   position: relative
    //   width: 80%
    //   height: 80vh
    //   top: 300px
    //   left: 10%
    //   background-color: white
    //   padding: 40px 20px 0px 20px
    
    // 
    
    // .search
    //   position: relative
    //   width: 30%
    //   height: 80vh
    //   top: 550px
    //   left: 10%

</style>