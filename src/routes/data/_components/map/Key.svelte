<!--
  @component
  Creates a key for ordinal scales on `zScale`.
 -->
 <script lang="ts">
    import { scaleOrdinal } from 'd3-scale';
	import colorScheme from '../../_data/colorScheme';
  
    /** @type {String} [shape='square'] - The shape for each item. Can be 'circle', 'line', or 'square'; */
    export let shape = 'square';
  
    /** @type {String} [align='start'] - Sets the CSS flexbox justify-content setting for the box as a whole. Can be 'start', 'center' or 'end'. */
    export let align = 'start';
  
    /** @type {Function|Object} [lookup] - Either a function that takes the value and returns a formatted string, or an object of values. If a given value is not present in a lookup object, it returns the original value. */
    export let lookup = undefined;
  
    /** @type {Boolean} [capitalize=true] - Capitalize the first character. */
    export let capitalize = true;


    const mapColors = {
      "black": colorScheme.colors.black,
      "white": colorScheme.colors.white,
      "asian": colorScheme.colors.asian,
      "hispanic": "Maroon",
      "indian": colorScheme.colors.indian
    }

    $: zDomain = Object.keys(mapColors);
    $: zScale = scaleOrdinal()
      .domain(zDomain)
      .range(Object.values(mapColors));
  
    function cap (val) {
      return String(val).replace(/^\w/, d => d.toUpperCase());
    }
  
    function displayName (val) {
      if (lookup) {
        return typeof lookup === 'function' ? lookup(val) : (lookup[val] || val);
      }
      return capitalize === true ? cap(val) : val;
    }

    let whiteTooltip = false;
    let x: number, y: number;
    
    function mouseOver(event) {
      whiteTooltip = true;
      x = event.pageX;
      y = event.pageY;
    }

    function mouseOut(event) {
      whiteTooltip = false;
    }

    

  </script>
  
  <style>

    .key {
      display: flex;
    }
    .key-item {
      margin-right: 14px;
    }
    .chip {
      display: inline-block;
      position: relative;
      width: 12px;
      height: 12px;
    }
    .chip__circle {
      border-radius: 50%;
    }
    .chip__line:after {
      content: '';
      position: absolute;
      border-width: 3px;
      width: 14px;
      transform: rotate(-45deg);
      transform-origin: 14px 5px;
    }
    .name {
      display: inline;
      font-size: 14px;
      /* text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff; */
      font-family: 'Rubik', Segoe UI;
      font-weight: 700;
      color: white
    }
    .tooltip {
        position: absolute;
        background-color: white;
        color: black;
        border: 1.5px solid black;
        padding: 0 10px;
        font-family: 'Rubik', Segoe UI;
        font-size: 1rem;
        font-weight: 400;
        text-align: left;
        z-index: 1000;
        width: 200px;
      }
    svg {
      width: 12px;
      height: 12px;
    }

  ion-icon{
      visibility: visible;
      transform: translateY(0.2rem);
      margin-left: 0.2rem;
    }
  </style>
  
  <div class='key' style="justify-content: {align === 'end' ? 'flex-end': align};">
    {#each zDomain as item}
      <div class='key-item'>
        <div
          class='chip chip__{shape}'
          style='background: {
            shape === `line` ?
            `linear-gradient(-45deg, #ffffff 40%, ${zScale(item)} 41%, ${zScale(item)} 59%, #ffffff 60%)`
            : zScale(item)};'
        ></div>
        <div class='name'>{(item == "indian" ? "American " : "")}{displayName(item)}</div>
      </div>
    {/each}
    <!-- {#each nodes as d}
    <div class='key-item'>
      <div class="chip">
      <svg>
        <rect
          x="0"
          y="0"
          width="12"
          height="12"
          stroke= {d == "female" ? "Tomato" : "black"}
          stroke-width="4"
          stroke-dasharray={d == "minor" ? ("2,2") : ("0,0")}
          fill = "white"
        />
      </svg>
      </div>
      <div class='name'>{displayName(d)}</div>
    </div>
    {/each} -->
  </div>

{#if whiteTooltip}
  <div class="tooltip" style="top: -130px; left: 0px">
    <p>The FBI includes Hispanic and non-Hispanic White Americans together in all missing persons statistics.</p>
  </div>
{/if}