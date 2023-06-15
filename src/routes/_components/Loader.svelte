<script>
    import { getContext, onMount } from 'svelte'
    import { contextKey } from '@beyonk/svelte-mapbox'
    import page from '../page'

    const { getMap, getMapbox } = getContext(contextKey)
    const map = getMap()    

    onMount(async function () {

        page.loadProgress.set(0)
        page.mapLoaded.set(false)

        map.flyTo({center: [-112.75343, 33.70804], zoom: 14, bearing: 160, pitch: 90, speed: 100, curve: 0.5, easing(t) {return t;}, preloadonly: true})
        await map.once('idle')
        page.loadProgress.set(34)

        map.flyTo({center: [-112.706596, 33.609363], zoom: 14, bearing: 160, pitch: 90, speed: 100, curve: 0.5, easing(t) {return t;}, preloadonly: true})
        await map.once('idle')
        page.loadProgress.set(68)

        map.flyTo({center: [-112.706596, 33.609363], zoom: 10.25, bearing: -90, pitch: 0, speed: 100, curve: 0.5, easing(t) {return t;}, preloadonly: true})
        await map.once('idle')
        page.loadProgress.set(100)

        map.flyTo({center: [-112.75343, 33.70804], zoom: 14, bearing: 160, pitch: 90, speed: 100, curve: 0.5, easing(t) {return t;}, preloadonly: true})
        await map.once('idle')

        page.mapLoaded.set(true)
    })

</script>