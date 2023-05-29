<script>

import team from '../team';
import { page } from '$app/stores';

let { slug } = $page.params;
let data = team.find(member => member.slug === slug);

</script>

<svelte:head>
    <title>
        {data?.name} | Detour Investigates
    </title>
</svelte:head>

<div class="page">
    <div class="body">
    <div class="bio">
        <div class="photo">
            <img src="{data?.photo}" alt="{data?.name}">
            <ul class="socials">
                {#each data?.socials as social}
                    <li><a href="{social.link}"><ion-icon name="{social.icon}"></ion-icon></a></li>
                {/each}
            </ul>
        </div>
        <div class="words">
            <h1>{data?.name}</h1>
            <h2>{data?.title}</h2>
            <p>{data?.bio}</p>
        </div>
    </div>
        <a href="/team"><h3>Meet the rest  of the team</h3></a>
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
    height: 100vh
    .body
        width: min(80%, 1000px)
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        gap: 30px
        padding-top: 50px
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
        height: 300px
        border-radius: 50%
        border: 5px solid $detour-orange
        object-fit: cover
        object-position: center
    p 
        font-family: $detour-body-font
        font-size: 1.2rem
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

@media screen and (max-width: 800px)
    .page
        height: inherit
        padding: 50px 0
        .bio
            flex-direction: column
            gap: 30px


</style>
