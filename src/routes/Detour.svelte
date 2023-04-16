<script lang="ts">
	import { tweened } from "svelte/motion";


    let scrollY: number;
    let navAlpha = tweened(0)
    $: (scrollY < 5113) ? navAlpha.set(0) : navAlpha.set(1)
    let windowheight: number;

    let scrollprogress: number;

    export let height: number = 0;
    export let storyy: number= 0;

    $:scrollprogress= (100*storyy)/(height-windowheight);


</script>

<svelte:window bind:scrollY bind:outerHeight={windowheight}/>


<div class="top-bar">
<div class="progress-bar" style="width:{scrollprogress}%"></div>
<nav style="background-color: rgba(255, 255, 255, {$navAlpha})">
    <div class="menu"></div>
    <div class="logo-container"><a href="https://detourxp.com/"><img src="https://detourxp.com/wp-content/uploads/sites/2/2022/12/DETOUR_logo.png" alt="Detour logo"></a></div>
    <div class="socials"></div>
</nav>
</div>

<style lang="sass">

    $primary-color: #fbb812

    .progress-bar
        position: fixed
        top: 0
        left: 0
        height: 5px
        background-color: $primary-color
        z-index: 9999

    nav
        top: 0
        left: 0
        z-index: 9998
        display: grid
        grid-template-columns: repeat(3, 1fr)
        border-bottom: 2px solid rgba(0, 0, 0, 0)
        color: $primary-color
        height: 70px
        width: 100%
        justify-items: center
        align-items: center
        position: fixed

        img
            max-height: 46px
            max-width: 100%  
        a
            text-decoration: none
            color: white
            font-size: 18px
            text-align: center
            padding: 10px

</style>