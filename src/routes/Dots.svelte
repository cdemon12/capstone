<script lang="ts">

</script>

<svg viewBox="0 0 100 100">
    {#each [...Array(25).keys()] as n}
        <circle cx="{2 * n}" cy=".75" r=".75" opacity="20"/>
    {/each}
    {#each [...Array(25).keys()] as n}
    <circle cx="{2 * n}" cy="2.75" r=".75" opacity="20"/>
    {/each}
</svg>