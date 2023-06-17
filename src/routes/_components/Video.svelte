<script>

    let video = false;



</script>

<div>

    {#if video}

    <iframe width="533" height="300" src="https://www.youtube.com/embed/oJedUsgeYYs?&autoplay=1" title="Lost in Buckeye: Searching for Daniel Robinson" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

    {/if}

    {#if !video}

    <img src="https://detourxp.com/wp-content/uploads/sites/2/2023/06/search-scaled.jpg" alt="Search for Daniel Robinson">

    <ion-icon name="play" on:click={() => video = true } on:keydown={() => video = true }></ion-icon>

    {/if}

</div>


<style lang="sass">


    div
        position: relative
        width: 533px
        height: 300px

    img
        width: 533px
        height: 300px
        object-fit: cover
        object-position: center

    ion-icon
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        font-size: 75px
        color: white
        cursor: pointer
        transition: all 0.3s ease-in-out
        visibility: visible
        &:hover
            transform: translate(-50%, -50%) scale(1.1)


    @media (max-width: 533px)
        div
            width: 100%
            height: 100%
        img
            width: 100%
            height: 100%
        ion-icon
            font-size: 50px
        iframe
            width: 100%
            height: 209px


</style>