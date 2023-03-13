<script>

    export const authors = [{name: "Jane Doe", head: "src/routes/assets/jane_doesnt_exist.png"}, {name: "John Doe", head:"src/routes/assets/john_doesnt_exist.png"}];

</script>
<div class="helper">
<ul class="bylines">
    {#each authors as author}
    <li><img src={author.head} alt="{author.name}"><span>{author.name}</span></li>
    {/each}
</ul>
</div>
<hr>

<style lang="sass">

    $primary-color: #fbb812


    .bylines
        list-style: none
        display: flex
        padding: 0
        margin: 0
        align-items: center
        justify-content: left
        li  
            height: 80px
            display: grid
            grid-template-columns: 1fr 1fr
            padding: 0 20px 0 20px
            img
                border-radius: 50%
                height: 55px
                max-width: 100%
                max-height: 100%
                border: 3px solid $primary-color
            span 
                font-weight: bold
                padding: 20px 0 0 0
    hr
        background-color: black
        height: 0.25px
        width: 90%
        padding:0
        margin:0
    .helper
        max-width: 72vw
        display: flex
        justify-self: start
        padding-left: 20px
        margin-top: 15px

        


</style>