<script>

</script>


<div class="body-container">
<div class="body">
<h1>Lorem ipsum dolor sit amet consectetur</h1>
<h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, fugit.</h2>
<p class="byline">By <a href="/">First Last</a>, May 22, 2023</p>
</div>
<div class="photo">
    <video src="src\routes\video\Draft 3.mp4" controls></video>
</div>
</div>


<style lang="sass">

    $detour-headline-font: Georgia
    $detour-body-font: 'Rubik', Segoe UI
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

         
    .photo
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        width: 100%
        gap: 10px
        margin: 30px 0 0 0
        img
            width: 70%
            height: auto
            margin: 0
            padding: 0
            object-fit: cover
            object-position: center
        .three
            display: flex
            flex-direction: row
            justify-content: center
            align-items: center
            gap: 10px
            img
                width: 30%
                height: auto
                aspect-ratio: 3/2
                margin: 0
                padding: 0
                object-fit: cover
                object-position: center

    .cutline
        font-family: $detour-body-font
        color: white
        opacity: 0.6
        font-size: 0.9rem
        font-weight: 400
        text-align: left
        margin: 0 0 30px 0
        padding: 0
        width: 70%

    video
        width: 70%
        height: auto
        margin: 0
        padding: 0
        object-fit: cover
        object-position: center


</style>