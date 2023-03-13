<script lang="ts">
   // import Dots from "./Dots.svelte"
   import Detour from "./Detour.svelte";
   import Main from "./Main.svelte";
   import UpNext from "./UpNext.svelte";
   import Database from "./FBIStory.svelte";
   import FbiStory from "./FBIStory.svelte";
   import ThinkPiece from "./ThinkPiece.svelte";
   import Footer from "./Footer.svelte";

   let height: number;
   let height1: number;
   let height2: number;
   let height3: number;
   let height4: number;
   let upnextheight: number;
   let y: number;
   let storyy: number = 0;
   let headerheight: number;

   $:{
        if (y < height1) {
            height = height1;
            storyy = y;
        }
        if (y > (height1 + upnextheight) && y < (height2 + height1 + upnextheight)) {
            height = height2;
            storyy = y - height1 - upnextheight;
        }
        if (y > (height2 + height1 + upnextheight*2) && y < (height3 + height2 + height1 + upnextheight*2)) {
            height = height3;
            storyy = y - height2 - height1 - upnextheight*2;
        }
        if (y > (height3 + height2 + height1 + upnextheight*3) && y < (height4 + height3 + height2 + height1 + upnextheight*3)) {
            height = height4;
            storyy = y - height3 - height2 - height1 - upnextheight*3;
        }
   }
</script>

<svelte:window bind:scrollY={y} />
<div bind:clientHeight={headerheight}>
<Detour {height} {storyy} />
</div>
<div bind:clientHeight={height1}>
<Main />
</div>
<div bind:clientHeight={upnextheight}>
<UpNext story_peak={"Black Americans go missing more than anyone else"} story_peak_link={"#data"} />
</div>
<a class="anchor" id="data">Anchor</a>
<div bind:clientHeight={height2}>
<Database />
</div>
<UpNext story_peak={"The FBI deals with missing persons cases...well sometimes"} story_peak_link={"#fbi"} />
<a class="anchor" id="fbi">Anchor</a>
<div bind:clientHeight={height3}>
<FbiStory />
</div>
<UpNext story_peak={"Gone missing where race and place intersects"} story_peak_link={"#think"} />
<a class="anchor" id="think">Anchor</a>
<div bind:clientHeight={height4}>
<ThinkPiece />
</div>
<Footer />


<style lang="sass">

    $primary-color: #fbb812

    a.anchor
        display: block
        position: relative
        top: -60px
        visibility: hidden

</style>
