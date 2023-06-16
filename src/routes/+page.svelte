<script lang="ts">
    import { Map } from '@beyonk/svelte-mapbox'
    import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public'
    import Terrian from './_components/Terrian.svelte';
    import Detour from './_components/Detour.svelte';
	import { writable } from 'svelte/store';
    import type { Writable } from 'svelte/store';
    import { blur } from 'svelte/transition';
	import { tweened } from 'svelte/motion';
    import { expoOut, linear, sineOut } from 'svelte/easing';
	import Choose from './_components/Choose.svelte';
	import { onMount } from 'svelte';
    import { getContext } from 'svelte';
	import Loader from './_components/Loader.svelte';
    import page from './page';
    import { pub_date } from './update';


    
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
    let mapLoaded = page.mapLoaded;
    let loadProgress = page.loadProgress;
    let y: number;
    let windowheight: number;
    $: step = writable(150*y/windowheight);
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
    $: travel($step, zoom, 35, 50, 14, 10.25)
    $: travel($step, bearing, 35, 50, 160, -90)
    $: travel($step, pitch, 35, 50, 90, 0)
    // frame 4
    $: travel($step, zoom, 50, 100, 10.25, 10.25)
    $: travel($step, bearing, 50, 100, -90, -90)
    $: travel($step, pitch, 50, 100, 0, 0)
    $: travel($step, lat, 50, 100, 33.609363, 33.609363)
    $: travel($step, lng, 50, 100, -112.706596, -112.706596)
    $: travel($step, scaleVideo, 60, 71, 1, 1.2)

    
    $: {
        if (mapComponent) {
            mapComponent.flyTo({center: [$lng, $lat], zoom: $zoom, bearing: $bearing, pitch: $pitch, speed: 1, curve: 0.5, easing(t) {return t;}}) 
        }
    }

    let width: number;


</script>

<svelte:head>
    <title>
        Lost in Buckeye: Searching for David Robinson | DETOUR Investigates
    </title>
    <meta name="title" content="Lost in Buckeye: Searching for David Robinson | DETOUR Investigates">
    <meta name="description" content="On June 23, 2021, Daniel Robinson, a 25-year-old geologist, went missing in the desert. His father has been searching for him ever since. Explore the investigation by DETOUR as they uncover the truth behind Daniel's disappearance.">
    <meta name="author" content="DETOUR">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="language" content="English">
    <meta property="og:title" content="Lost in Buckeye: Searching for David Robinson | DETOUR Investigates">
    <meta property="og:description" content="On June 23, 2021, Daniel Robinson, a 25-year-old geologist, went missing in the desert. His father has been searching for him ever since. Explore the investigation by DETOUR as they uncover the truth behind Daniel's disappearance.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://capstone-rosy.vercel.app/">
    <meta property="og:image" content="https://github.com/cdemon12/capstone/raw/main/src/routes/_assets/david.JPG">
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://capstone-rosy.vercel.app/">
    <meta property="twitter:title" content="Lost in Buckeye: Searching for David Robinson | DETOUR Investigates">
    <meta property="twitter:description" content="On June 23, 2021, Daniel Robinson, a 25-year-old geologist, went missing in the desert. His father has been searching for him ever since. Explore the investigation by DETOUR as they uncover the truth behind Daniel's disappearance.">
    <meta property="twitter:image" content="https://github.com/cdemon12/capstone/raw/main/src/routes/_assets/david.JPG">
</svelte:head>

<svelte:window bind:scrollY={y} />

{#if !$mapLoaded}
<div class="loader">

    <p>Loading 'Lost in Buckeye' ... {Math.round($loadProgress)}%</p>
    <div class="progress-bar">
        <div class="progress" style="width:{$loadProgress}%"></div>
    </div>

</div>
{/if}

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

{#if $step < 130}
<div class="scroll">
    <p>Scroll to continue</p>
</div>
{/if}



<div class="outer">
<div class="container" bind:clientHeight={windowheight} bind:clientWidth={width}>
<div class="map">
<Map
    accessToken={PUBLIC_MAPBOX_TOKEN}
    bind:this={mapComponent}    
    options={{ scrollZoom: false, interactive: false, bearing: -90, pitch: 0, minTileCacheSize: 1000}}
    style="mapbox://styles/cs030100/clg4g3200000301lkd3m52xlh"
    zoom={10.5}
    center={[-112.706596, 33.609363]}
>
<Loader />
<Terrian />
</Map>
</div>
{#if inStep($step, 0, 20)}
    <div class="headline first" out:blur={{duration: 1000}}>
        <h1>Lost in Buckeye</h1>
        <h1 style="font-size: 30px">Searching for Daniel Robinson</h1>
        <h3 style="font-size: 20px">Presented by Detour and <br /> the Missouri School of Journalism </h3>
        <h3 style="font-size: 20px; "><em>{pub_date}</em></h3>
        
    </div>
{/if}
{#if inStep($step, 7, 30)}
<div class="headline second" in:blur={{duration: 1000}} out:blur={{duration: 2000}}>
    <h1>On June 23, 2021, Daniel Robinson, a 25-year-old geologist, went missing in this desert.</h1>
</div>
{/if}
{#if inStep($step, 40, 70)}
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
    <div class="headline third" out:blur={{duration:500}}>
        <h1>His father, a U.S. army veteran who survived two tours in Afghanistan desert, has been searching ever since.</h1>
        <h1>This is their story.</h1>
    </div>
{/if}
<!-- {#if inStep($step, 40, 100)}
    <div class="headline fourth">
        <iframe width="800" height="450" style="transform: scale({$scaleVideo})" src="https://www.youtube.com/embed/34XKylJksSs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
{/if} -->
<div class="sticky-container one">
    <div class="video">
            <iframe width="533" height="400" src="https://www.youtube.com/embed/mKkpv1rQRN4" title="Lost in Buckeye: Searching for Daniel Robinson" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>        <div class="words">
            <h1>Out there, somewhere...</h1>
            <h2>A father's mission</h2>
            <p>By <a itemprop="author" name="Taylor Schmitt" href="/team/taylor">Taylor Schmitt</a>, <a  itemprop="author" name="Rylee Fels" href="/team/rylee">Rylee Fels</a> and <a  itemprop="author" name="Lucy Caile" href="/team/lucy">Lucy Caile</a>, {pub_date}</p>
            <p style="font-style: italic; text-align: center;">This one of several elements in <a href="https://capstone-rosy.vercel.app/">a series about Daniel Robinson and missing persons in U.S.</a> To learn more, read the <a href="/publishers-note">Publisher's Note</a>.</p>

            <p>Read <a href="https://s3.documentcloud.org/documents/21080582/robinson-report-9-23-21.pdf?fbclid=IwAR1ueFK5AO2B-2yyjaYAI8dkxABiJjBe4TRgjNod956Te6FDzRVEUyBk3js">the the police report here.</a></p>
        </div>
    </div>
</div>
<div class="sticky-container two">
    <div class="choose">
        <Choose />
    </div>
</div>
</div>
</div>

<style lang="sass">

    $detour-headline-font: Georgia
    $detour-body-font: 'Rubik', Segoe UI
    $detour-orange: #fbb812

    $multiplier: .75

    .debug
        visibility: hidden
        position: fixed
        top: 0
        left: 0
        z-index: 9999
        background-color: rgba(255, 255, 255, .5)
        color: black
        font-family: monospace
        font-size: 1rem
        padding: 1rem

    .scroll
        position: fixed
        bottom: 0
        left: 0
        z-index: 1000
        background-color: #282729
        color: black
        font-family: $detour-body-font
        font-size: 1rem
        height: 30px
        width: 100%
        text-align: center
        display: flex
        justify-content: center
        align-items: center
        border-top: 0.5px solid white
        p 
            color: white
            margin: 0
            padding: 0

    :global(.mapboxgl-map)
        height: 200px
        width: 500px

    .loader
        position: fixed
        width: 100%
        height: 100%
        background-color: #282729
        z-index: 9999
        display: flex
        flex-direction: column
        gap: 10px
        justify-content: center
        align-items: center
        overflow: hidden
        .progress-bar
            height: 5px
            width: 200px
            border: 1px solid white
            display: flex
            justify-content: start
            align-items: center
            .progress
                background-color: $detour-orange
                height: 100%
        p
            color: white
            font-family: $detour-body-font
            font-size: 1.5rem
            margin: 0
            padding: 0
        


    .container
        height: calc(800vh * $multiplier)
        width: 100%
    
    .outer
        height: calc(600vh * $multiplier + 300vh)
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
        top: 20%
        left: 50%
        transform: translateX(-50%)
        height: 100vh
        width: 80%
        z-index: 100
        font-size: 30px
        h1
            text-shadow: 0 0 10px black

    .first
        background-color: #282729
        position: absolute
        top: 50vh
        left: 50%
        transform: translate(-50%, -50%)
        padding: 0.5em
        border: 1px solid white
        width: min(500px, 80%)
        font-size: 20px
        color: white
        z-index: 100



    .third
        position: absolute
        top: calc(400vh * $multiplier)
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
        top: calc(700vh * $multiplier)
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
        background-color: #282729
        padding: 0.5em
        width: 200px
        font-size: 1.8em
        border: 1px solid white
        .key-title
            font-size: 0.7em
            font-family: $detour-body-font
            color: white
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
                color: white


    .sticky-container
        position: absolute
        top: 0vh
        width: 100%
        left: 0
        height: 150vh
        background-color: #282729
        padding-top: 20px
        padding-bottom: 20px
        margin-bottom: 20px
        top: calc(600vh * $multiplier)
        + .two
            top: calc(600vh * $multiplier + 150vh)


    .choose, .video
        position: sticky
        top: 85px
        left: 0
        padding-bottom: 100px

    .video
        display: flex
        justify-content: center
        align-items: center
        color: white
        height: calc(100vh - 145px)
        gap: 20px
        flex-direction: row-reverse
        iframe
            width: 600px
            height: 400px
            aspect-ratio: 16/9
        h1
            font-family: $detour-headline-font
            font-size: 3rem
            font-weight: 700
            text-align: center
            margin: 0
            padding: 0
            text-shadow: 0 10px 10px rgba(0,0,0,0.5)
        h2
            font-family: $detour-body-font
            font-size: 2rem
            font-weight: 400
            text-align: center
            margin: 0
            padding: 0
        p
            font-family: $detour-body-font
            font-size: 1.1rem
            font-weight: 400
            margin: 0
            padding: 0
            width: 100%
            line-height: 1.5rem
            text-align: center
            font-style: italic
        .words
            display: flex
            justify-content: center
            align-items: center
            flex-direction: column
            gap: 20px
            width: 30%
        a
            color: white
            text-decoration: underline
            &:hover
                color: $detour-orange

    @media (max-width: 900px)
        .second
            h1 
                font-size: 2.7rem

        .video
            flex-direction: column
            justify-content: start
            height: 60vh
            top: 70px
            iframe
                width: 100%
                height: 300px
                aspect-ratio: 16/9
            .words
                width: 80%
                h1 
                    font-size: 2rem


</style>