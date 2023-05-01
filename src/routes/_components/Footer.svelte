<script lang="ts">


</script>

<footer>
    <div class="detour-info">
        <div>
            <a href="detourxp.com"><img src="https://detourxp.com/wp-content/uploads/sites/2/2022/12/DETOUR_logo.png" alt="Detour Logo" width="300px" height="auto"></a>
            <p>Welcome to DETOUR, your multimedia travel brand that re-introduces you to the world you know – but through a uniquely Black storytelling lens that chronicles and celebrates the places we live and travel. DETOUR brings together journalists, writers, historians, photographers, illustrators and filmmakers to revisit – and, in many cases, revise – the Black cultural narrative worldwide.</p>
        </div>
        <div>
            <h1>AS SEEN ON:</h1>
            <img src="https://detourxp.com/wp-content/uploads/sites/2/2022/06/miami-herald-logo.svg" alt="Miami Herald">
            <img src="https://detourxp.com/wp-content/uploads/sites/2/2022/06/Charlotte-Observer-logo.svg" alt="Charlotte Observer">
        </div>
    </div>
    <ul>
        <li><a href="https://detourxp.com/subscribe/">SUBSCRIBE</a></li>
        <li><a href="https://detourxp.com/contact/">CONTACT</a></li>
        <li><a href="https://detourxp.com/writers/">WRITE FOR US</a></li>
        <li><a href="https://detourxp.com/sitemap/">SITEMAP</a></li>
    </ul>
    <p class="copyright">© COPYRIGHT 2023. ALL RIGHTS RESERVED.</p>
</footer>


<style lang="sass">

    $primary-color: #fbb812
    $detour-body-font: 'Rubik', Segoe UI, Helvetica, Arial, sans-serif
    $detour-headline-font: Georgia

    footer
        position: relative
        background-color: #f8f8f7
        height: 300px
        font-family: $detour-body-font
        padding-bottom: 100px
        z-index: 9999
        .detour-info
            display: flex
            gap: 40px
            padding: 30px 10vw 0 10vw
            div
                width: 50%
            img
                max-width: 100%
                aspect-ratio: auto 300 / 77
            p
                color: black
                font-weight: bold
            h1
                font-family: $detour-headline-font
        .copyright
            text-align: center
            font-size: 13px
            color: $primary-color
            margin: 30px 30vw 100px 30vw
    ul
        list-style: none
        padding: 0
        display: flex
        justify-content: center
        li
            justify-items: center
            margin: 0 10px 0 10px
            text-align: center
            padding: 0
            a
                text-decoration: none
                color: $primary-color
                font-size: 13px
                text-align: center
                font-weight: bold
                &:hover
                    color: white
    
    @media (max-width: 900px)
        footer
            height: 550px
            .detour-info
                flex-direction: column
                gap: 0
                div
                    width: 100%
            .copyright
                margin-top:0
        

</style>