<script lang="ts">
    import colorScheme from "./_data/colorScheme";

    let colors = {
        "asian_male_minor": "#B2B6AB",
        "black_male_minor": "#9CA0B2",
        "white_male_minor": "#B6A8B6",
        "indian_male_minor": "#CABBA6",
        "asian_female_minor": "#DEE4D6",
        "black_female_minor": "#C3C8DF",
        "white_female_minor": "#E3D2E3",
        "indian_female_minor": "#FCEAD0",
        "asian_male_adult": "#869F8D",
        "black_male_adult": "#61789A",
        "white_male_adult": "#8D879F",
        "indian_male_adult": "#B1A885",
        "asian_female_adult": "#C0E4CA",
        "black_female_adult": "#8BACDD",
        "white_female_adult": "#CAC1E4",
        "indian_female_adult": "#FDF0BE"
    }


</script>
<div style="transform:rotate(-45deg) translate(300px,-150px)">
<div class="label" style="transform: translate(-40px, -10px);">
    <p>Asian</p>
    <p>Black</p>
    <p>White</p>
    <p>Indian</p>
</div>

<div class="label" style="display:flex; flex-direction: rows; transform:translateY(-30px); width: 8rem; justify-content: space-around;">
    <p>Minor</p>
    <p>Adult</p>
</div>

<div class="label" style="transform:rotate(90deg) translate(80px,-45px)">
    <p>Female</p>
    <p>Male</p>
    <p>Female</p>
    <p>Male</p>
</div>

{#each Object.keys(colorScheme) as color, i}
    <div class="color-swatch">
        <div class="color-swatch__color" style="background-color: {colorScheme[color]}; transform:translateY({2*i}rem)"></div>
    </div>
{/each}
    <div class="color-swatch">
        <div class="color-swatch__color" style="background-color: #FCE3E2; height: 8rem; width: 4rem;"></div>
    </div>
    <div class="color-swatch">
        <div class="color-swatch__color" style="background-color:black; height: 8rem; width: 2rem; opacity: 0.2"></div>
    </div>
    <div class="color-swatch">
        <div class="color-swatch__color" style="background-color:black; height: 8rem; width: 2rem; transform:translate(4rem, 0); opacity: 0.3"></div>
    </div>
</div>
<style lang="sass">
    .color-swatch
        position: absolute
        width: 8rem
        height: 2rem

    .color-swatch__color
        width: 8rem
        height: 2rem
        opacity: 0.5

    p
        font-family: 'Rubik', Segoe UI
        font-size: 0.8rem
        padding: 1px 0

    .label
        position: absolute
</style>