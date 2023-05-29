<script>
    import data from './team';
    
</script>

<svelte:head>
    <title>
        The Team | Detour Investigates
    </title>
</svelte:head>

<div class="page">
    <div class="body">
        <h1>The Team</h1>

        <ul>
            {#each data as member}
                <a href="/team/{member.slug}">
                <li>
                    <img src="{member.photo}" alt="{member.name}">
                    <div class="words">
                        <h3>{member.name}</h3>
                        <h4>{member.title}</h4>
                    </div>
                </li>
                </a>
            {/each}
        </ul>

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
    width: 100%
    padding: 100px 0px
    .body
        width: min(100%, 1120px)
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        gap: 10px
        height: calc(100vh - 200px)
        padding-top: 30px
    ul
        display: flex
        flex-direction: row
        flex-wrap: wrap
        justify-content: center
        align-items: center
        gap: 20px
        width: 100%
        padding: 0px
        margin: 0px
    h1
        font-family: $detour-headline-font
        font-size: 3rem
        color: $detour-orange
        text-align: center
        width: 100%
        margin: 0px
        padding: 0px
    h3
        font-family: $detour-headline-font
        font-size: 1.5rem
        color: white
        text-align: left
        width: 100%
        margin: 0px
        padding: 0px
        text-align: center
    h4
        font-family: $detour-headline-font
        font-size: 1rem
        color: white
        text-align: left
        width: 100%
        margin: 0px
        padding: 0px
        text-align: center
    img
        width: 130px
        height: 130px
        border-radius: 50%
        object-fit: cover
        object-position: center
        border: 1px solid $detour-orange
    a
        text-decoration: none
        color: inherit
    li
        list-style: none
        height: 130px
        width: 290px
        display: flex
        flex-direction: row
        justify-content: center
        align-items: center
        gap: 5px
        border: 1px solid white
        padding: 7px
        filter: grayscale(100%)
        transition: all 0.5s ease-in-out
        &:hover
            filter: grayscale(0%)
            transition: all 0.5s ease-in-out
            border: 1px solid $detour-orange
            // height: 170px
            // width: 330px
            h3 
                color: $detour-orange     
    .words
        width: 150px   
    




</style>
