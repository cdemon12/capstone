<script lang="ts">

    let y: number;
    let windowheight: number;

    let scrollprogress: number;

    export let height: number;
    export let storyy: number;

    $:scrollprogress= (100*storyy)/(height-windowheight);


</script>

<svelte:window bind:scrollY={y} bind:outerHeight={windowheight}/>


<div class="top-bar">
<div class="progress-bar" style="width:{scrollprogress}%"></div>
<nav>
    <div class="menu"></div>
    <div class="logo-container"><a href="https://detourxp.com/"><img src="src\routes\assets\DETOUR_logo.png" alt="Detour logo"></a></div>
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
        background-color: white
        color: $primary-color
        padding: 16px 40px 16px 40px
        height: 46px
        width: 95vw
        justify-items: center
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