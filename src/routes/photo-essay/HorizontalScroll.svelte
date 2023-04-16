<script lang="ts">


</script>

<div class="container">
    <div class="sticky">
        <div class="content">
            <slot name="first"/>
        </div>
        <div class="content">
            <slot name="second"/>
        </div>
    </div>
</div>

<style lang="sass">

    .container
        position: relative
        width: 100%
        height: 500vh
        .sticky
            top: 0
            left: 0
            width: 100%
            height: 100vh
            .content
                position: absolute
                top: 0
                left: 0
                width: 100%
                height: 100%
                img
                    width: 100%
                    height: 100%
                    object-fit: cover
                    object-position: center
</style>