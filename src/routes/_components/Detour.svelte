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

    import { page } from '$app/stores';

    $: slug = $page.route.id?.split("/")[1]

    const main_url = "https://lostinbuckeye.com/"


</script>

<svelte:window bind:scrollY bind:outerHeight={windowheight}/>


<div class="top-bar">
<div class="progress-bar" style="width:{scrollprogress}%"></div>
<nav>
    <div class="logo-container"><a href="/"><img src="https://detourxp.com/wp-content/uploads/sites/2/2023/06/detour.png" alt="Detour logo"></a></div>
    <div class="socials">
        <ul>
            <li><a href="https://www.facebook.com/sharer/sharer.php?u={main_url + slug}"><ion-icon name="logo-facebook"></ion-icon></a></li>
            <li><a href="https://www.linkedin.com/shareArticle?mini=true&url={main_url + slug}"><ion-icon name="logo-linkedin"></ion-icon></a></li>
            <li><a href="https://pinterest.com/pin/create/button/?url={main_url + slug}"><ion-icon name="logo-pinterest"></ion-icon></a></li>
            <li><a href="https://twitter.com/intent/tweet?url={main_url + slug}"><ion-icon name="logo-twitter"></ion-icon></a></li>
            <li><a href="mailto:?&subject=&cc=&bcc=&body={main_url + slug}%0A"><ion-icon name="mail"></ion-icon></a></li>
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
            padding-left: 0
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

@media (max-width: 410px)
    nav
        img
            width: 100%
            height: 90px
        ul
            justify-content: end
            padding-right: 10px

</style>