<script lang="ts">
    import { Map } from '@beyonk/svelte-mapbox'
    import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public'
    import Terrian from './Terrian.svelte';
    import Detour from './Detour.svelte';
	import { writable } from 'svelte/store';
    import type { Writable } from 'svelte/store';
    import { blur } from 'svelte/transition';
	import { tweened } from 'svelte/motion';
    import { expoOut, linear, sineOut } from 'svelte/easing';
	import Choose from './Choose.svelte';

    
    const inStep = function(step: number, start: number, end: number) {
        return step >= start && step < end;
    }
    
    const travel = function(step:number, store:any, start_step:number, end_step:number, from:number, to:number) {
        if (step >= start_step && step < end_step) {
            store.set(from + ((step - start_step)/(end_step - start_step) * (to - from)));
        }
    }

    function easing(t: number) {
        return t * (2 - t);
    }   

    let mapComponent: any = null;  
    let y: number;
    let windowheight: number;
    $: step = writable(100*y/windowheight);
    const scaleVideo =tweened(1);   
    const lat: Writable<number> = writable(33.70804);
    const lng: Writable<number> = writable(-112.75343);
    const zoom: Writable<number> = writable(14);
    const bearing: Writable<number> = writable(160);
    const pitch: Writable<number> =  writable(90);
    
    // frame 1
    $: travel($step, lat, 0, 2, 33.70804, 33.70804)
    $: travel($step, lng, 0, 2, -112.75343, -112.75343)
    $: travel($step, zoom, 0, 35, 14, 14)
    $: travel($step, bearing, 0, 35, 160, 160)
    $: travel($step, pitch, 0, 35, 90, 90)    
    // frame 2
    $: travel($step, lat, 2, 30, 33.70804, 33.609363)
    $: travel($step, lng, 2, 30, -112.75343, -112.706596)
    // frame 3
    $: travel($step, zoom, 35, 50, 14, 10)
    $: travel($step, bearing, 35, 50, 160, -90)
    $: travel($step, pitch, 35, 50, 90, 0)
    // frame 4
    $: travel($step, zoom, 50, 100, 10, 10)
    $: travel($step, bearing, 50, 100, -90, -90)
    $: travel($step, pitch, 50, 100, 0, 0)
    $: travel($step, scaleVideo, 60, 71, 1, 1.2)

    $:{ if (mapComponent) 
        {mapComponent.flyTo({center: [$lng, $lat], zoom: $zoom, bearing: $bearing, pitch: $pitch, speed: 1, curve: 0.5, easing(t) {return t;}}) 
    }}


</script>

<svelte:window bind:scrollY={y}/>

<div class="debug">
    <p>Step: {$step}</p>
    <p>Lng: {$lng}</p>
    <p>Lat: {$lat}</p>
    <p>Zoom: {$zoom}</p>
    <p>Bearing: {$bearing}</p>
    <p>Pitch: {$pitch}</p>
    <p>scaleVideo: {$scaleVideo}</p>
    <p>Y: {y}</p>
</div>

<div class="outer">
<div class="container" bind:clientHeight={windowheight}>
<div class="map">
<Map
    accessToken={PUBLIC_MAPBOX_TOKEN}
    bind:this={mapComponent}    
    options={{ scrollZoom: false, interactive: false, bearing: 160, pitch: 0 }}
    style="mapbox://styles/cs030100/clg4g3200000301lkd3m52xlh"
    zoom={14}
    center={[-112.75343, 33.70804]}
>
<Terrian />
</Map>
</div>
{#if inStep($step, 0, 20)}
    <div class="headline first" out:blur={{duration: 1000}}>
        <h1>Searching for Daniel</h1>
        <h1 style="font-size: 30px">A father's mission</h1>
        <h3 style="font-size: 20px">Presented by Detour and the Missouri School of Journalism</h3>
    </div>
{/if}
{#if inStep($step, 7, 30)}
<div class="headline second" in:blur={{duration: 1000}} out:blur={{duration: 2000}}>
    <h1>On June 23, 2021, Daniel Robinson went missing in this desert.</h1>
</div>
{/if}
{#if inStep($step, 40, 61)}
    <div class="key" in:blur={{duration:1000}} out:blur={{duration:1000}}>
        <div class="key-title">Searches Organized By David Robinson</div>
        <div class="key-item">
            <div class="key-item-color" style="background-color: #fbb812"></div>
            <div class="key-item-text">Line Searched</div>
        </div>
        <div class="key-item">
            <div class="key-item-color" style="background-color: SteelBlue"></div>
            <div class="key-item-text">Hasty Searched</div>
        </div>
    </div>
    <div class="headline third" out:blur={{duration:1000}}>
        <h1>His father, David Robinson, has spent the last two years searching the desert.</h1>
        <h1>This is their story.</h1>
    </div>
{/if}
<!-- {#if inStep($step, 40, 100)}
    <div class="headline fourth">
        <iframe width="800" height="450" style="transform: scale({$scaleVideo})" src="https://www.youtube.com/embed/34XKylJksSs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
{/if} -->
<div class="choose">
    <Choose />
</div>
</div>
</div>

<style lang="sass">

    $detour-headline-font: Georgia
    $detour-body-font: halyard-display, Segoe UI
    $detour-orange: #fbb812

    .debug
        visibility: hidden
        position: fixed
        top: 0
        left: 0
        z-index: 1000
        background-color: rgba(255, 255, 255, .5)
        color: black
        font-family: monospace
        font-size: 1rem
        padding: 1rem

    :global(.mapboxgl-map)
        height: 200px
        width: 500px

    .container
        height: 900vh
        width: 100%
    
    .outer
        height: 900vh
        width: 100%

    .map
        top: 0
        left: 0
        position: sticky
        height: 100vh
        width: 100%
    
    h1
        font-family: $detour-headline-font
    
    h3
        font-family: $detour-body-font

    .headline
        display: flex
        justify-content: center
        align-items: center
        color: white
        font-size: 2rem
        font-weight: 700
        text-align: center
        flex-direction: column

    .second
        position: fixed
        top: 30%
        left: 50%
        transform: translateX(-50%)
        height: 100vh
        width: 80%
        z-index: 100
        font-size: 30px
        h1
            text-shadow: 0 0 10px black

    .first
        background-color: rgba(255, 255, 255, 1)
        position: absolute
        top: 50vh
        left: 50%
        transform: translate(-50%, -50%)
        padding: 0.5em
        border: 2px solid rgba(0, 0, 0, 0)
        width: 500px
        font-size: 20px
        color: black
        z-index: 100
        box-shadow: 0 0 10px black


    .third
        position: absolute
        top: 600vh
        left: 50%
        transform: translate(-50%, -50%)
        padding: 1em
        width: 80%
        color: white
        z-index: 100
        h1
            text-shadow: 0 0 10px black
            font-size: 40px
    .fourth
        position: absolute
        top: 700vh
        left: 50%
        transform: translate(-50%, -50%)
        padding: 1em
        color: white
        z-index: 100
    
    .key
        position: fixed
        top: 10%
        right: 10%
        display: flex
        justify-content: start
        align-items: center
        flex-direction: column
        margin: 1em 0
        background-color: white
        box-shadow: 0 0 10px black
        padding: 0.5em
        width: 200px
        font-size: 1.8em
        .key-title
            font-size: 0.7em
            font-family: $detour-body-font
            color: black
            margin-bottom: 0.5em
            text-align: left
            font-weight: 700
        .key-item
            display: flex
            justify-content: start
            align-items: center
            width: 100%
            .key-item-color
                width: 0.7em
                height: 0.7em
                margin-right: 0.5em
            .key-item-text
                transform: translateY(-0.05em)
                font-size: 0.7em
                font-family: $detour-body-font
                color: black
    .choose
        position: absolute
        top: 850vh
        width: 100%
        height: 100vh
        left: 50%
        transform: translate(-50%, -50%)

</style>