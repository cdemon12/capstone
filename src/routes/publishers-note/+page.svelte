<svelte:head>
    <title>
        Publisher's Note | DETOUR Investigates
    </title>
</svelte:head>

    
    
    <div class="page">
        <div class="body">
            <div class="photo">
                <img src="https://github.com/cdemon12/capstone/raw/main/src/routes/_assets/ron.jpg" alt="Ron Stodghill and David Robinson">
            </div>
            <div class="words">
                <h1>Publisher's Note</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem itaque explicabo eaque sapiente, officiis nobis aut animi aliquid, vel alias perferendis accusamus, voluptatum numquam laborum totam assumenda eligendi quod cum neque voluptas. Iure perferendis, accusamus eos cumque repudiandae beatae? Tempore nostrum amet eligendi repellat illum ullam nesciunt aspernatur in aliquam, corporis dolor consequuntur, esse error! Nesciunt doloribus suscipit iste sunt quibusdam, modi inventore repellat! Natus voluptates architecto illo ab perspiciatis! Praesentium explicabo voluptatibus, veritatis mollitia quaerat id, accusantium doloribus enim doloremque voluptate et blanditiis optio, quia molestias quibusdam exercitationem maiores? Quos officiis quis accusamus. Voluptatum distinctio repellat saepe vitae pariatur molestias laboriosam voluptatibus laborum alias debitis quas soluta enim minima et nobis consequatur iste in corrupti ipsam non, facilis nemo? A numquam quidem fugiat odit optio quas exercitationem dolor distinctio ullam assumenda officia, voluptatum repudiandae labore aperiam ducimus adipisci consequuntur, itaque eum cupiditate! Debitis totam atque quas voluptatibus! Id distinctio at magnam quidem explicabo fugit voluptatem suscipit aut voluptas, eligendi tempore odit temporibus. Voluptates accusamus nihil excepturi, animi voluptate quasi temporibus ut! Soluta omnis placeat eos cupiditate consectetur explicabo fugiat totam sint assumenda dolore et, quasi iste inventore ipsa ipsam dicta, nulla non maiores sequi cumque temporibus vero tenetur ratione. Nostrum modi, totam eos earum laborum aliquam non fugit quas perferendis culpa molestias, a facilis iste excepturi? Est, eum quam, eos iusto ab reprehenderit culpa expedita sint velit ipsum soluta asperiores odio id perferendis laboriosam animi ducimus, fugiat laudantium enim dolore rem? Aut dolores laborum voluptatum sapiente, earum architecto molestias labore maxime est quod enim illo at maiores, vitae id quam rerum recusandae et. Recusandae tempora error voluptatibus nobis eveniet voluptas perferendis. Dicta iusto expedita culpa illum, deleniti laudantium asperiores cum quis reprehenderit neque, qui doloremque praesentium suscipit quas. Suscipit libero necessitatibus ex ipsam beatae, laudantium nostrum dolorem dolore quos?</p>
                <p style="font-style: italic;">- Ron Stodghill, Publisher of DETOUR</p>
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
    