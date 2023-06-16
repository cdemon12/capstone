<script>

    import Chart from './_compotents/Chart.svelte'
    import Table from './_compotents/Table.svelte';
    import Text from './_compotents/Text.svelte';
    import Questions from './_compotents/Questions.svelte';
    import ReadNext from '../_components/ReadNext.svelte';

    import { open } from './open';
    import { colHovered } from './colHovered';

    import { tweened } from 'svelte/motion';

    // layout variables
    let firstRowHeight;




    // data variables
    import data from './_data/data'
	import { min } from 'd3';

    let year = "2022"
    let zKey = "race"
    let group = "none";
    let xKey = "sex"
    let show = {race: true, sex: true, age: true};
    let cases = tweened(0, {duration: 1000})
    let selected = "race, sex and age"

    $: show = selected === "race, sex and age" ? {race: true, sex: true, age: true} : selected


    $: cases.set(data[year].total_cases)
    $: displayData = data[year]
        .breakdown
        .filter(d => 
            (show.race ? d["race"] !== "all" : d["race"] === "all") &&
            (show.sex ? d["sex"] !== "all" : d["sex"] === "all") &&
            (show.age ? d["age"] !== "all" : d["age"] === "all")
            )
    $: groupBy = group === "none" ? false : true
    $: xKey = group === "none" ? "sex" : group


    $: show.race ? show.age ? show.sex ? group = "sex and age" : group = "age" : show.sex ? group = "sex" : group = "none" : show.age ? show.sex ? group = "sex" : group = "none" : show.sex ? group = "none" : group = "none"
    $: show.race ? zKey = "race" : show.age && show.sex ? zKey = "age" : show.age ? zKey = "age" : zKey = "sex"

    $: console.log(show)

</script>

<svelte:head>
    <title>
        A case per minute: Missing persons by the numbers | Detour Investigates
    </title>
    <meta name="title" content="A case per minute: Missing persons by the numbers | Detour Investigates">    
</svelte:head>

<div class="body-container" on:click={() => open.set(false)} on:keydown>
    <div class="body">
        <div class="header">
            <div class="numbers">
                <div class="box">
                    <select bind:value={year}>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                    </select>
                </div>
                <div class="box">
                    <h1>{Math.round($cases).toLocaleString()}</h1>
                    <h2>missing persons cases</h2>
                </div>
                <div class="box">
                    <h1>{Math.round($cases / 365).toLocaleString()}</h1>
                    <h2>missing persons cases per day</h2>
                </div>
                <div class="box">
                    <h1>{Math.round($cases / 365 / 24 / 60).toLocaleString()}</h1>
                    <h2>missing persons cases per minute</h2>
                </div>

            </div>
            <div>
                <h1>Which groups among</h1>
            
                <select bind:value={selected}>
                    <option value="race, sex and age">race, sex and age</option>
                    <option value="{{race: true, sex: true, age: false}}">race and sex</option>
                    <option value="{{race: true, sex: false, age: true}}">race and age</option>
                    <option value="{{race: true, sex: false, age: false}}">race</option>
                    <option value="{{race: false, sex: true, age: false}}">sex</option>
                    <option value="{{race: false, sex: false, age: true}}">age</option>
                </select>
            
            <h1> had the greatest relative risk of going missing?</h1>
            </div>
            <div>
                <h2>Relative risk is the risk of a member of a given group going missing compared to the average American in that year.</h2>
            </div>
        </div>

        <div class="bee">
            <Chart
                {displayData}
                {zKey}
                {year}
                {groupBy}
                {xKey}
                hovered={$colHovered}
            />
        </div>


        <div class="table">
            <Table
                {displayData}
                {show}
            />
        </div>



        <div class="words">
            <Questions />

            <h1>
                About the data
            </h1>
            <p>
                The data used in this project comes from the FBI's National Crime Information Center (NCIC) Missing Person and Unidentified Person Statistics for 2020-22. The 2022 data is available for download <a href="https://www.fbi.gov/file-repository/2022-ncic-missing-person-and-unidentified-person-statistics.pdf/view">here</a>.
            </p>
            <p>
                To report an error or suggest an edit, email <a href="mailto:coloeschnell@gmail.com">coleschnell@gmail.com.</a>
            </p> 
            <p style="text-align: left;">This one of several elements in <a href="/">a series about Daniel Robinson and missing persons in U.S.</a> To learn more, read the <a href="/publishers-note">Publisher's Note</a>.</p>
        </div>
    </div>
</div>

<ReadNext />

<Text />

<style lang="sass">

    $detour-headline-font: Georgia
    $detour-body-font: 'Rubik', Segoe UI
    $detour-orange: #fbb812
   
    .body-container
        width: 100%
        background-color: #282729

    .body
        width: min(95%, 1200px)
        margin: 0 auto
        padding-top: 70px
        background-color: #282729
        display: grid
        grid-template-columns: 2fr 3fr
        grid-template-rows: 270px 1fr
        grid-template-areas: "header header" "bee table" "words words"
        grid-gap: 5px
        overflow: hidden

    .bee
        padding-right: 20px
        grid-area: bee
        height: calc(100vh - 70px - 270px - 40px)
        display: flex
        flex-direction: column
        justify-content: start
        align-items: center
        gap: 10px

    .table
        grid-area: table
        width: 100%

    .header
        grid-area: header
        width: 100%
        display: flex
        flex-direction: column
        justify-content: center
        align-items: start
        gap: 10px

    .numbers
        display: flex
        flex-direction: row
        justify-content: center
        align-items: center
        gap: 10px
        width: 100%
        padding: 10px 0 10px 0
        flex-wrap: wrap
        .box
            display: flex
            flex-direction: column
            justify-content: center
            align-items: center
            gap: 5px
            width: calc(100% / 4 - 50px)
            height: 100px
            background-color: #3a3a3a
            border-radius: 10px
            padding: 20px
            text-align: center

    .words
        grid-area: words
        width: 100%
        padding: 0 20px 0 20px
        display: flex
        flex-direction: column
        justify-content: start
        align-items: start
        gap: 10px        
    
    // basic

    h1
        color: white
        font-size: 30px
        font-weight: 100
        margin: 0
        padding: 0
        font-family: $detour-headline-font
        display: inline
    
    h2
        color: white
        font-size: 20px
        font-weight: 400
        margin: 0
        padding: 0
        font-family: $detour-body-font
        display: inline
        opacity: 0.6

    p
        color: white
        font-size: 1.2rem
        font-weight: 400
        margin: 0
        padding: 0
        font-family: $detour-body-font

    select
        background-color: #3a3a3a
        color: white
        border: none
        font-size: 30px
        font-weight: 100
        margin: 0
        padding: 0
        font-family: $detour-headline-font
        outline: none
        cursor: pointer
        display: inline
        margin-left: 4px
        height: 35px
        paddding-bottom: 10px
        border-radius: 10px

    button
        background-color: #282729
        color: white
        cursor: pointer
        font-family: $detour-body-font
        font-size: 16px
        font-weight: 400
        text-align: left
        border: none
        width: 100%

    a
        font-family: $detour-body-font
        font-weight: 400
        text-align: left
        border: none
        width: 100%
        cursor: pointer
        color: white
        &:hover
            color: $detour-orange


@media (max-width: 900px)
    .body
        display: flex
        flex-direction: column
        justify-content: start
        align-items: center
        width: 95%
    .numbers
        justify-content: center
        align-items: center
        .box
            width: calc(100% / 2 - 50px)
    .bee
        height: 390px
        padding-bottom: 20px
        width: 90%
    .table
        width: 100%

</style>