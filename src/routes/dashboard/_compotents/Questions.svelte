<script>
    let innerWidth = 0;

    let questions =
        innerWidth > 900 ?
        [
            {question: "Why aren't Hispanic Americans included?", answer: "The FBI includes Hispanic Americans in the 'White' category.", open: false},
            {question: "What is isolated relative risk?", answer: "Isolated relative risk is the risk shared among all groups the associated characteristic(s) is present in.", open: false},
        ] :
        [
            {question: "Why aren't Hispanic Americans included?", answer: "The FBI includes Hispanic Americans in the 'White' category.", open: false},
        ]

</script>

<svelte:window bind:innerWidth />

<div class="container">
    {#each questions as question}
        <div class="question" on:click={() => question.open = !question.open} on:keydown>
            <div class="question-text">
                <p> <ion-icon name={question.open ? "chevron-down-outline" : "chevron-forward-outline"}></ion-icon>{question.question}</p>
            </div>
        </div>
        {#if question.open}
            <div class="answer">
                <div class="line"></div>
                <p>{question.answer}</p>
            </div>
        {/if}
    {/each}
</div>

<style lang="sass">

    $detour-headline-font: Georgia
    $detour-body-font: 'Rubik', Segoe UI
    $detour-orange: #fbb812

    p
        font-size: 1.2rem
        font-weight: 500
        line-height: 1.5rem
        margin: 0
        padding: 0
        color: white
        font-family: $detour-body-font

    ion-icon
        font-size: 1.2rem
        margin-right: 10px
        cursor: pointer
        visibility: visible

    .line
        width: 2px
        height: 100%
        background-color: white
        margin: 20px 0 20px 30px
    
    .answer
        width: 100%
        display: flex
        flex-direction: row
        justify-content: start
        align-items: center
        gap: 20px
        height: 30px
    
    .container
        width: 100%
        display: flex
        flex-direction: column
        justify-content: start
        align-items: start
        gap: 20px
        padding: 20px
        margin-top: 20px

</style>