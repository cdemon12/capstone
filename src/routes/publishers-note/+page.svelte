<svelte:head>
    <title>
        Publisher's Note | DETOUR Investigates
    </title>
    <meta name="title" content="Publisher's Note | DETOUR Investigates">
</svelte:head>

    
    
    <div class="page">
        <div class="body">
            <div class="photo">
                <img src="https://github.com/cdemon12/capstone/raw/main/src/routes/_assets/ron.jpg" alt="Ron Stodghill and David Robinson">
            </div>
            <div class="words">
                <h1>Publisher's Note</h1>
                <p>Since the start of my career, I’ve always tried to keep my feelings separate from my work.  This is tough, but I've learned through the years  it's best in my profession to put some emotional distance between yourself and your subject.</p>
                <p>David Robinson was different. from the moment we met, I saw myself in his story, as a Black man and father.  And I feel for him. Just watch him in our short documentary as he moves through the vast, desolate Sonoran desert, looking for Daniel, his 25-year-old geologist son who mysteriously disappeared exactly two years ago today. I hope the story of David’s search inspires all parents, especially dads. </p>
                <p>David’s struggle reflects a history of Black veterans at odds with the very system they once served. David, who served two tours of duty in Afghanistan, has spent the past two years uncertain about whether the Buckeye Police Department has even seriously looked for his son - which is why he has taken matters into his own hands. It doesn’t help either that Buckeye, an hour outside Phoenix,  is a known “sundown town" - meaning Black people enter the area, especially at night, at their own risk. </p>
                <p>An admission: A couple months ago, as we were wrapping our field reporting for Lost in Buckeye, I broke my no-photo rule, which goes like this: no matter how enamored I am with my subject, resist asking to be photographed with them. The rule has resulted in a slender scrapbook, but I've proudly lived by it after interviews with myriad heroes, from Oprah to Serena to Trevor to Spike. My only record of our contact is the story itself, as it probably should be.</p>
                <p>David Robinson, again, was different. As our reporting team wrapped up our desert field reporting a couple months ago, David rode by me on his ATV. I waved at him to come over, and asked whether he'd please take a picture with me. He hopped off his vehicle, and there we were, a couple of Black dads standing side by side, as brothers. 
                    Here's the photo, and David's story. Thank you for reading. </p>
                <p style="font-style: italic;">- Ron Stodghill</p>
            </div>
    </div>
</div>
    
    
    <style lang="sass">
    
    $detour-headline-font: Georgia
    $detour-body-font: 'Rubik', Segoe UI
    $detour-orange: #fbb812
    
    .page
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        background-color:  #282729
        .body
            width: min(80%, 1000px)
            display: flex
            flex-direction: row
            justify-content: center
            align-items: start
            gap: 30px
            padding: 100px 0
        h1 
            font-family: $detour-headline-font
            font-size: 3rem
            color: $detour-orange
            text-align: left
            width: 100%
            margin: 0px
            padding: 0px
        h2
            font-family: $detour-headline-font
            font-size: 2rem
            color: $detour-orange
            text-align: left
            width: 100%
            margin: 0px
            padding: 0px
        a
            text-decoration: none
            color: white
            &:hover
                text-decoration: underline
        h3
            font-family: $detour-headline-font
            font-size: 1.5rem
            color: $detour-orange
            text-align: left
            width: 100%
            margin: 0px
            padding: 0px
        img
            width: 300px
            height: 500px
            object-fit: cover
            object-position: center
        p 
            font-family: $detour-body-font
            font-size: 1.1rem
            color: white
            text-align: left
            max-width: 500px
            line-height: 1.5
            margin: 0px
            padding: 0px
        .words
            display: flex
            flex-direction: column
            justify-content: center
            align-items: left
            gap: 10px
        .bio
            display: flex
            flex-direction: row
            justify-content: center
            align-items: center
            gap: 30px
        .photo
            display: flex
            flex-direction: column
            justify-content: center
            align-items: center
            gap: 5px
            position: sticky
            top: 100px
        .socials
            display: flex
            flex-direction: row
            justify-content: center
            align-items: center
            gap: 15px
            padding: 0px
            width: 100%
            flex-wrap: wrap
            li
                list-style: none
                padding: 0px
                a
                    color: white
                    font-size: 1.5rem
                    text-decoration: none
                    &:hover
                        color: $detour-orange
                    ion-icon
                        visibility: visible
                        width: 30px
                        height: 30px
    
    @media (max-width: 800px)
        .page
            .body
                flex-direction: column
                gap: 30px
                padding: 50px 0
            .photo
                position: static
                width: 100%
                padding-top: 50px
    
    
    </style>
    