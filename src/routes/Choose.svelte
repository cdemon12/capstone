<script lang="ts">
    let stickyHeight;
    let alignItems = "center";
</script>

<div class="container" style="align-items: {alignItems}">
    <a href="/video" class="storybox">
    <!-- <a href="#main" class="storybox" on:mouseover={() => alignItems = "start"} on:mouseout={() => alignItems = "end"}> -->
        <img src="src\routes\assets\search.jpg" alt="">
        <div class="words">       
            <div>
                <h1>Father, volunteers still searching for lost geologist</h1>
                <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id nemo officiis, magni placeat velit quo enim temporibus exercitationem est voluptatum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, quos.</h4>
            </div> 
            <div class="byline-recommend">
                <div class="recommend"><ion-icon name="videocam-outline"></ion-icon><p>Video</p></div>
            </div>
        </div>
    </a>
    <a href="/profile" class="storybox">
        <img src="src\routes\assets\david.jpg" alt="">
        <div class="words">
            <div>
                <h1>Search for Daniel: A father’s mission</h1>
                <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id nemo officiis, magni placeat velit quo enim temporibus exercitationem est voluptatum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, quos.</h4>
            </div> 
            <div class="byline-recommend">
            <div class="recommend"><ion-icon name="person-circle-outline"></ion-icon><p>Profile</p></div>
        </div>
        </div>
    </a>
    {#if true}
    <a href="/data" class="storybox">
        <img src="src\routes\assets\sankey.jpg" alt="">
        <div class="words">
            <div>
                <h1>What missing persons cases reveal about racism</h1>
                <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id nemo officiis, magni placeat velit quo enim temporibus exercitationem est voluptatum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, quos.</h4>
            </div> 
        <div class="byline-recommend">
            <div class="recommend"><ion-icon name="bar-chart-outline"></ion-icon><p>Data-focused</p></div>
        </div>
        </div>
    </a>
    <a href="/photo-essay" class="storybox">
        <img src="src\routes\assets\hopeville.jpg" alt="">
        <div class="words">
            <div>
                <h1>Letter from Hopeville</h1>
                <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id nemo officiis, magni placeat velit quo enim temporibus exercitationem est voluptatum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, quos.</h4>
            </div> 
        <div class="byline-recommend">
            <div class="recommend"><ion-icon name="image-outline"></ion-icon><p>Photo essay</p></div>
        </div>
        </div>
    </a>
    {/if}
</div>

<style lang="sass">

    $not-quite-black: #303030
    $detour-orange: #fbb812
    $detour-headline-font: Georgia
    $detour-body-font: halyard-display, Segoe UI

    a
        text-decoration: none


    .container
        height: calc(100vh - 100px)
        width: 95%
        display: flex
        flex-direction: row
        // flex-wrap: wrap
        justify-content: center
        gap: 10px
        margin: 0 2.5%
        &:hover a:not(a:hover)
            img
                filter: blur(2px)
                -webkit-filter: blur(2px)
                transition: filter 0.8s ease-in-out
            h1
                opacity: 0
                transition: opacity 0.8s ease-in-out
        .storybox
            position: relative
            height: 100%
            width: 22%
            // height: 50%
            // width: 25%
            border-radius: 4px
            padding: 0
            overflow: hidden
            box-shadow: 0 0 10px black  
            transition: width 0.8s ease-in-out
            // transition: height 0.8s ease-in-out
            // transition: scale 0.8s ease-in-out
            // &:first-child
            //     width: calc(75% + 10px)
            //     transition: height 0.8s ease-in-out
            &:hover
                width: 100%
                transition: width 0.8s ease-in-out
                // height: 70%
                // transition: height 0.8s ease-in-out
                h4
                    opacity: 1
                    transition: opacity 0.8s ease-in-out
            // &:hover ~ .storybox 
            //     img
            //         filter: blur(2px)
            //         -webkit-filter: blur(2px)
            //         transition: filter 0.8s ease-in-out
            //     h1
            //         opacity: 0
            //         transition: opacity 0.8s ease-in-out
            img
                position: relative
                height: 100%
                width: 100%
                z-index: -1
                object-fit: cover
                transition: filter 0.8s ease-in-out
            .words
                padding: 0px 5px 7px 5px
                height: 100%
                margin: 0
                display: flex
                flex-direction: column
                align-content: space-between
                justify-content: space-between
                transform: translateY(-100%)
                h1, h4.byline
                    padding: 5px
                h1
                    color: white // $not-quite-black
                    //background-color: white
                    font-family: $detour-headline-font
                    margin-top: 7px
                    width: calc(22vw - 25px)
                    text-shadow: 0 0 10px black
                    transition: opacity 0.8s ease-in-out
                h4
                    width: calc(22vw - 70px)
                    background-color: white
                    color: $not-quite-black
                    font-family: $detour-body-font
                    font-weight: 400
                    padding: 5px
                    margin-left: 5px
                    opacity: 0
                    transition: opacity 0.8s ease-in-out
                    box-shadow: 0 0 10px black
                .byline-recommend
                    display: flex
                    justify-content: end
                    align-items: end
                    .recommend
                        display: flex
                        align-items: end
                        justify-content: end
                        color: $detour-orange
                        background: $not-quite-black
                        padding: 5px 10px
                        border-radius: 5px
                        opacity: 0.8
                        text-shadow: 0 0 10px black
                        p
                            margin: 0
                            font-size: 0.9em
                            padding: 0
                            margin-left: 5px
                            font-family: $detour-body-font
                        ion-icon
                            visibility: visible
                &:hover h4
                    opacity: 0.8
                    transition: opacity 0.4s ease-in-out 
</style>