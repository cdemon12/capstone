<script>
   // import Dots from "./Dots.svelte"
   import Detour from "./Detour.svelte";
   import Main from "./Main.svelte";
   import UpNext from "./UpNext.svelte";
   import Database from "./Database.svelte";
   import FbiStory from "./FBIStory.svelte";
   import ThinkPiece from "./ThinkPiece.svelte";

   let height = Number;
   
</script>

<Detour height={height} />
<div bind:clientHeight={height}>
<Main />
</div>
<UpNext story_peak={"Black Americans go missing more than anyone else"} />
<div id="data">
<Database />
</div>
<UpNext story_peak={"The FBI deals with missing persons cases...well sometimes"} />
<div id="fbi">
<FbiStory />
</div>
<UpNext story_peak={"Gone missing where race and place intersects"} />
<div id="think">
<ThinkPiece />
</div>


<style lang="sass">

    $primary-color: #fbb812

</style>
