<script lang="ts">
	import { tweened } from "svelte/motion";


    let scrollY: number;
    let navAlpha = tweened(0)
    $: (scrollY <= 0 ) ? navAlpha.set(1) : navAlpha.set(1) //5113
    let windowheight: number;

    let scrollprogress: number;

    export let height: number = 0;
    export let storyy: number= 0;

    $:scrollprogress= (100*storyy)/(height-windowheight);


</script>

<svelte:window bind:scrollY bind:outerHeight={windowheight}/>


<div class="top-bar">
<div class="progress-bar" style="width:{scrollprogress}%"></div>
<nav>
    <div class="logo-container"><a href="https://detourxp.com/"><img src="https://github.com/cdemon12/capstone/raw/main/src/routes/assets/Detour%20Investigates%20font.png" alt="Detour logo"></a></div>
    <div class="socials">
        <ul>
            <li><a href="/"><ion-icon name="logo-twitter"></ion-icon></a></li>
            <li><a href="/"><ion-icon name="logo-facebook"></ion-icon></a></li>
            <li><a href="/"><ion-icon name="logo-linkedin"></ion-icon></a></li>
            <li><a href="/"><ion-icon name="logo-pinterest"></ion-icon></a></li>
            <li><a href="/"><ion-icon name="logo-instagram"></ion-icon></a></li>
            <li><a href="/"><ion-icon name="share-social-outline"></ion-icon></a></li>
        </ul>
    </div>
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
        display: flex
        grid-template-columns: repeat(3, 1fr)
        border-bottom: 2px solid rgba(0, 0, 0, 0)
        color: $primary-color
        background-color: #282729
        height: 70px
        width: 100%
        align-items: center
        justify-content: space-between
        position: fixed
        border-bottom: .5px solid white
        padding-bottom: 0px
        img
            height: 100px
            width: 100% 
            object-fit: cover
            object-position: center
            overflow: hidden 
            transform: translateX(-10%)
        a
            text-decoration: none
            color: white
            font-size: 18px
            text-align: center
            padding: 10px
        ul
            list-style: none
            display: flex
            justify-content: space-between
            width: 250px
            padding-right: 20px
            li
                font-size: 20px
                color: white
                transition: all .3s ease-in-out
                cursor: pointer
                margin: 0
                padding: 0
                &:hover
                    color: $primary-color
                    transform: scale(1.2)
                    transition: all .3s ease-in-out
                ion-icon
                    visibility: visible
            

</style>