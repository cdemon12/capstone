<script>
	import { tweened } from "svelte/motion";


    let time = 0;
    const startTime = new  Date()
    let currentTime = new Date()
    let timeLapsed = tweened(0, { duration: 1000 })
    $: timeLapsed.set(new Date(currentTime - startTime).getSeconds() / 60)

    function updateTime() {
        currentTime = new Date()

        setTimeout(updateTime, 10)
    }

    updateTime()

    let r = 90
    let x = tweened(0, { duration: 1000 })
    let y = tweened(r, { duration: 1000 })

    $: x.set(r + r * Math.cos(($timeLapsed - .25) * 2 * Math.PI))
    $: y.set(r + r * Math.sin(($timeLapsed - .25) * 2 * Math.PI))


</script>

<div class="circle">

    <div class="text">
        {Math.round($timeLapsed)}
        cases since reading
    </div>

    <div class="ball" style="top:{$y}px; left:{$x}px;">

    </div>
</div>


<style lang="sass">

    .circle
        border-radius: 50%
        width: 200px
        height: 200px
        border: 2px solid white

    .ball
        border-radius: 50%
        width: 20px
        height: 20px
        background-color: white
        position: relative
        top: 0px
        left: 90px

    .text
        position: relative
        top: 50px
        left: 50px
        font-size: 1.2rem
        font-weight: 400
        font-family: 'Rubik', Segoe UI
        color: white
        text-align: center
        width: 100px
        line-height: 1.5rem
        z-index: 100



</style>