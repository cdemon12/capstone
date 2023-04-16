<script lang="ts">

    export const cutline: string = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error repellendus enim consectetur id esse voluptates, nam corporis eaque tempore sunt sequi ipsa fuga, impedit quam asperiores!";
    export const byline: string = "Joe Schmo";
    export const img_link: string = "https://picsum.photos/1000/700"
    export const img_alt: string = "This is an image";

</script>


<div class="helper">
    <img src={img_link} alt={img_alt}>
    <div class="text">
        <p class="byline">{byline}</p>
        <p class="cutline">{cutline}</p>
    </div>
</div>

<style lang="sass">

    $primary-color: #fbb812

    .helper
        display: flex
        flex-direction: column
        align-items: center
        height: 100%
        width: 100%
        background-color: #eee
        padding: 10px 10px 0px 10px
        border-radius: 10px
        img
            width: 100%
            max-height: 100%
            object-fit: cover
        .text
            display: flex
            flex-direction: column
            height: 100%
            width: 100%
            margin: 5px 0 0 0
            padding: 0
            p
                margin: 0
                padding: 0
            .byline
                font-weight: bold
                text-align: right
                color: $primary-color 
            .cutline
                font-weight: normal
                text-align: left

</style>