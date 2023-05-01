<script>
    import { page } from '$app/stores';
    import data from '../_assets/posts';

    $: slug = $page.route.id?.split("/")[1]

    $: posts = data.filter(post => post.slug !== slug)

    $: console.log(slug)

</script>


<div class="page">
    
    <ul class="socials">
        <li>Share this article:</li>
        <li><a href="/"><ion-icon name="logo-facebook"></ion-icon></a></li>
        <li><a href="/"><ion-icon name="logo-linkedin"></ion-icon></a></li>
        <li><a href="/"><ion-icon name="logo-pinterest"></ion-icon></a></li>
        <li><a href="/"><ion-icon name="logo-instagram"></ion-icon></a></li>
        <li><a href="/"><ion-icon name="logo-twitter"></ion-icon></a></li>
        <li><a href="/"><ion-icon name="mail"></ion-icon></a></li>
        <li><a href="/"><ion-icon name="share-social-outline"></ion-icon></a></li>
    </ul>

    <div class="line"></div>

    <div class="read-next">
        <h2>Read Next</h2>
        <ul>
            {#each posts as post}
                <li>
                    <a href="/{post.slug}">
                        <img src="{post.photo}" alt="{post.title}">
                        <h3>{post.title}</h3>
                    </a>
                </li>
            {/each}
        </ul>
    </div>


    <div class="behind">
        <a href="/">
            <img src="https://picsum.photos/300" alt="">
            <div class="words">
                <h3>Publisher's studio Lorem ipsum dolor sit amet.</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas omnis dolorum ipsam neque animi enim voluptates minima qui temporibus sequi veniam repellat ex ratione repellendus, laborum repudiandae soluta eum voluptatibus.</p>
            </div>
        </a>
    </div>


</div>

<style lang="sass">

$detour-orange: #fbb812

.line
    width: min(calc( .8 * 700px ), calc(70% * .7))
    height: 2px
    background-color: #fbb812
    margin-bottom: 20px

.page
    width: 100%
    background-color: #282729
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    padding-bottom: 50px
    .socials
        list-style: none
        display: flex
        flex-wrap: wrap
        justify-content: center
        align-items: center
        padding: 0px
        width: min(80%, 700px)
        li
            padding: 10px
            color: white
            font-size: 18px
            font-family: 'Rubik', sans-serif
            a
                color: white
                font-size: 18px
                text-decoration: none
                &:hover
                    color: #fbb812
                    transition: .3s
                    transform: scale(1.1)
                    cursor: pointer
                ion-icon
                    width: 30px
                    height: 30px
    .read-next
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        h2
            color: white
            font-size: 24px
            font-family: 'Georgia', sans-serif
            margin: 0px
            padding: 0px
        ul
            list-style: none
            display: flex
            justify-content: center
            align-items: center
            margin: 0px
            padding: 0px
            li
                color: white
                font-size: 18px
                font-family: 'Georgia', sans-serif
                padding: 10px
                border: 2px solid rgba(0, 0, 0, 0)
                transition: all .5s
                width: 250px
                height: 300px
                &:hover
                    border: 2px solid $detour-orange
                    transition: all .5s
                    a
                        color: #fbb812
                        cursor: pointer
                        text-decoration: underline
                a
                    color: white
                    font-size: 18px
                    text-decoration: none
                    transition: all .5s
        img
            width: 250px
            height: 200px
            object-fit: cover
            object-position: center
    
    .behind
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        border: 2px solid rgba(0, 0, 0, 0)
        &:hover
            border: 2px solid $detour-orange
            p
                transition: .3s
                color: #fbb812
            h3
                transition: .3s
                color: #fbb812
                text-decoration: underline
        h2
            color: white
            font-size: 24px
            font-family: 'Georgia', sans-serif
            margin: 0px
            padding: 0px
        a
            display: flex
            justify-content: space-between
            align-items: center
            color: black
            padding: 10px
            width: min(798px, 70%)
            text-decoration: none
            gap: 30px
            img
                width: 250px
                height: 200px
                object-fit: cover
                object-position: center
                padding: 0px
                margin: 0px
            .words
                font-size: 18px
                color: white
                font-family: 'Georgia', sans-serif
                display: flex
                justify-content: space-between
                align-items: start
                flex-direction: column
                text-align: left
                height: 100%
                line-height: 1.5rem
                gap: 15px
                h3
                    margin: 0px
                    padding: 0px
                p
                    margin: 0px
                    padding: 0px
                    font-family: 'Rubik', sans-serif

@media (max-width: 900px)
    .read-next
        ul
            flex-direction: column
    .behind
        width: 100vw
        a
            flex-direction: column
        .words
            width: 85%


</style>