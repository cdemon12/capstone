<script>
    import { getContext } from 'svelte'
    import { contextKey } from '@beyonk/svelte-mapbox'

    const { getMap, getMapbox } = getContext(contextKey)
    const map = getMap()
    const mapbox = getMapbox()

    // map.addSource('mapbox-dem', {
    // 'type': 'raster-dem',
    // 'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
    // 'tileSize': 512,
    // 'maxzoom': 14
    // });
    // add the DEM source as a terrain layer with exaggerated height
    map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

</script>
