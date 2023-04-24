<script>

    const grafs = ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta officiis facilis deleniti ratione, molestiae ea earum natus vitae! Voluptates id quaerat harum quasi libero quidem sint voluptas, placeat qui dolorem!", 
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta officiis facilis deleniti ratione, molestiae ea earum natus vitae! Voluptates id quaerat harum quasi libero quidem sint voluptas, placeat qui dolorem!", 
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta officiis facilis deleniti ratione, molestiae ea earum natus vitae! Voluptates id quaerat harum quasi libero quidem sint voluptas, placeat qui dolorem!", 
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta officiis facilis deleniti ratione, molestiae ea earum natus vitae! Voluptates id quaerat harum quasi libero quidem sint voluptas, placeat qui dolorem!"
]

</script>


<div class="body-container">
<div class="body">
<h1>Lorem ipsum dolor sit amet consectetur</h1>
<h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, fugit.</h2>
<p class="byline">By <a href="/">First Last</a>, May 22, 2023</p>

    {#each grafs as graf}
        <p>{graf}</p>
    {/each}

    <h4>"Highlight a quote like this"</h4>

    {#each grafs as graf}
        <p>{@html graf}</p>
    {/each}


</div>
</div>


<style lang="sass">

    $detour-headline-font: Georgia
    $detour-body-font: halyard-display, Segoe UI
    $detour-orange: #fbb812

    a
        color: white
        text-decoration: underline
        &:hover
            color: $detour-orange

    .body-container
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        background-color:  #282729
        padding: 70px 0 30px 0
        width: 100%
        .body
            display: flex
            flex-direction: column
            justify-content: center
            align-items: center
            width: min(70%, 700px)
            color: white
            gap: 20px
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
            h4
                font-size: 2rem
                padding: 0
                margin: 0
            .byline 
                font-style: italic
                text-align: center
                font-size: 1.05 rem


</style>