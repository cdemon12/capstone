<script lang="ts">
	import { writable } from "svelte/store";
    import type { Writable } from "svelte/store";

    export let imageOne: string;
    export let imageTwo: string;
    export let height: number = 0;
    export let offset: number = 0;
    export let scrollDistance: number = 0;

    let scrollY: number;
    let opacity: Writable<number> = writable();
    let photo: HTMLElement;
    let scrollPosition: number;

    $: (photo) ? scrollPosition = photo.offsetTop: null
    $: opacity.set((scrollY - scrollPosition - (offset * height) > 0 && scrollY - scrollPosition - (offset * height) < (scrollDistance * height)) ? (scrollY - scrollPosition - (offset * height))/(scrollDistance * height) : (scrollY - scrollPosition - (offset * height) < 0) ? 0 : 1);

</script>

<div class="debug">
    <p>scrollY: {scrollY}</p>
    <p>scrollPosition: {scrollPosition}</p>
    <p>offset: {offset}</p>
    <p>scrollDistance: {scrollDistance}</p>
    <p>opacity: {$opacity}</p>
</div>

<svelte:window bind:scrollY />
<div class="container" bind:this={photo} style="height: {height}px;">
    <div class="sticky">
        <img src="{imageOne}" alt="" style="opacity: {1 - $opacity}">
        <img src="{imageTwo}" alt="" style="opacity: {$opacity}; transform: translateY(-101%);">
    </div>
</div>

<style lang="sass">

    .debug
        position: fixed
        top: 0
        left: 0
        z-index: 9999
        background-color: rgba(0, 0, 0, 0.5)
        color: white
        padding: 1rem
        p
            margin: 0
            font-size: 1rem
            line-height: 1.5rem

    .container
        position: relative
        width: 100%
        .sticky
            position: sticky
            top: 0
            left: 0
            width: 100%
            height: 100vh
            img
                width: 100%
                height: 100%
                object-fit: cover
                object-position: center               

</style>