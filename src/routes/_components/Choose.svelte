<script lang="ts">
    let stickyHeight;
    let alignItems = "center";
</script>

<div class="container" style="align-items: {alignItems}">
    <a href="/profile" class="storybox">
        <img src="https://detourxp.com/wp-content/uploads/sites/2/2023/06/david-scaled.jpg" alt="David Robinson speaking to volunteers">
        <div class="words">
            <div>
                <h1>72 hours in Buckeye, Arizona</h1>
            </div> 
            <div class="byline-recommend">
            <div class="recommend"><ion-icon name="person-circle-outline"></ion-icon><p>Profile</p></div>
        </div>
        </div>
    </a>
    <a href="/dashboard" class="storybox">
        <img src="https://detourxp.com/wp-content/uploads/sites/2/2023/06/dashboard.png" alt="Graph of relative risk of going missing amoung race, sex and age">
        <div class="words">
            <div>
                <h1>A case per minute: Missing persons by the numbers</h1>
            </div> 
        <div class="byline-recommend">
            <div class="recommend"><ion-icon name="bar-chart-outline"></ion-icon><p>Data-focused</p></div>
        </div>
        </div>
    </a>
    <a href="/photo-essay" class="storybox">
        <img src="https://detourxp.com/wp-content/uploads/sites/2/2023/06/hopeville-scaled.jpg" alt="Sign for the town of 'Hopeville'">
        <div class="words">
            <div>
                <h1>Letter from Hopeville, Arizona</h1>
            </div> 
        <div class="byline-recommend">
            <div class="recommend"><ion-icon name="image-outline"></ion-icon><p>Photo essay</p></div>
        </div>
        </div>
    </a>
    <a href="/list" class="storybox">
        <img src="https://detourxp.com/wp-content/uploads/sites/2/2023/06/list-scaled.jpg" alt="Volunteers in the desert during the search">
        <div class="words">
            <div>
                <h1>What’s missing in ‘Missing Persons’ investigations?</h1>
            </div> 
        <div class="byline-recommend">
            <div class="recommend"><ion-icon name="list-outline"></ion-icon><p>List</p></div>
        </div>
        </div>
    </a>
</div>

<style lang="sass">

    $not-quite-black: #303030
    $detour-orange: #fbb812
    $detour-headline-font: Georgia
    $detour-body-font: 'Rubik', Segoe UI

    a
        text-decoration: none


    .container
        height: calc(100vh - 100px)
        width: 90%
        margin: 0 5%
        display: flex
        flex-direction: row
        // flex-wrap: wrap
        justify-content: center
        gap: 10px
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
            width: 25%
            border-radius: 4px
            padding: 0
            overflow: hidden
            box-shadow: 0 0 10px black  
            transition: width 0.8s ease-in-out
            &:hover
                width: 100%
                transition: width 0.8s ease-in-out
                h4
                    opacity: 1
                    transition: opacity 0.8s ease-in-out
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
                    font-family: $detour-headline-font
                    margin-top: 7px
                    width: calc(17vw - 25px)
                    text-shadow: 0 0 10px black
                    transition: opacity 0.8s ease-in-out
                    font-size: 1.8rem
                h4
                    width: 200px //calc(20vw - 70px)
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
                        align-items: center
                        justify-content: center
                        color: $detour-orange
                        background: $not-quite-black
                        padding: 5px 10px
                        border-radius: 5px
                        opacity: 0.8
                        text-shadow: 0 0 10px black
                        text-align: center
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

    @media screen and (max-width: 900px)
        .container
            flex-direction: column
            gap: 20px
            &:hover a:not(a:hover)
                img
                    filter: none
                    -webkit-filter: none
                    transition: none
                h1
                    opacity: 1
                    transition: none
            .storybox
                width: 100%
                height: 100%
                .words
                    h1
                        width: 100%
                        font-size: 1.8rem
                        margin-bottom: 0
                    h4
                        display: none

              
</style>