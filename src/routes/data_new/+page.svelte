<script>
    
    let time = 0;
    const startTime = new  Date()
    let currentTime = new Date()
    $: timeLapsed = new Date(currentTime - startTime).getMinutes() + (new Date(currentTime - startTime).getHours() - 18) * 60 + ' minutes'

    function updateTime() {
        currentTime = new Date()

        setTimeout(updateTime, 10)
    }

    updateTime()

</script>

<div class="body">
    <h3>{timeLapsed}</h3>
    <h1>A case per minute</h1>
    <h2>Missing persons cases in the U.S. by the data</h2>
    <p class="byline">By Cole Schnell and Kristin Kuchno, May 23, 2023</p>
</div>

<style lang='sass'>

    $detour-headline-font: Georgia
    $detour-body-font: 'Rubik', Segoe UI
    $detour-orange: #fbb812

    .body
        padding: 60px 0 0 0
        margin: 0
        background-color: #282729
        color: white

    // basic

    h1
        font-family: $detour-headline-font
        font-size: 4rem
        font-weight: 700
        text-align: center
        margin: 0
        padding: 0
        text-shadow: 0 10px 10px rgba(0,0,0,0.5)
        padding-top: 50px

    h2
            font-family: $detour-body-font
            font-size: 2rem
            font-weight: 400
            text-align: center
            margin: 0
            padding: 0
    
    p
        font-family: $detour-body-font
        font-size: 1.1rem
        font-weight: 400
        margin: 0
        padding: 0
        width: 100%
        line-height: 1.5rem

    .byline
        font-style: italic
        text-align: center
        font-size: 1.05 rem


</style>