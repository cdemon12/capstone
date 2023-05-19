<script>
    import data from './_data/data'
    import { scaleLinear } from 'd3-scale'
    import Chart from './_compotents/Chart.svelte'
    import Searchbar from './_compotents/Searchbar.svelte';
	import Search from '../data/search/Search.svelte';
	import Map from './_compotents/Map.svelte';
	import Key from './_compotents/Key.svelte';
    import namus from "./_data/namus";


    let year = "2022"
    $: displayData = data[year]
    let clicked = "FBI National Crime Information Center"
    let zKey = "race"
    let group = "none";
    let groupBy = false;
    let xKey = "sex"
    let hovered = false

    $: groupBy = group === "none" ? false : true
    $: xKey = group === "none" ? "sex" : group


    let barChartRange = 100

    let colorScaleRisk = scaleLinear()
        .domain([0, 7.59])
        .range(["#282729", "#db3236"])

    let colorScaleDisparity = scaleLinear()
        .domain([-.3, 0, .3])
        .range(["#4885ed", "#282729","#db3236"])
    
    let colorScaleCases = scaleLinear()
        .domain([0, 200000])
        .range(["#282729", "#db3236"])

    let colorScaleBar = scaleLinear()
        .domain([0, .4])
        .range(["#db3236", "#db3236"])


    let sortBy = {col: "relative_risk", ascending: false};
	
	$: sort = (column) => {
		
		if (sortBy.col == column) {
			sortBy.ascending = !sortBy.ascending
		} else {
			sortBy.col = column
			sortBy.ascending = true
		}
		
		// Modifier to sorting function for ascending or descending
		let sortModifier = (sortBy.ascending) ? 1 : -1;
		
		let sort = (a, b) => 
			(a[column] < b[column]) 
			? -1 * sortModifier 
			: (a[column] > b[column]) 
			? 1 * sortModifier 
			: 0;
		
		displayData.breakdown = displayData.breakdown.sort(sort);
	}

    let clickedColumns = []


    $: click = (column) => {
        if (clickedColumns.includes(column)) {
            clickedColumns = clickedColumns.filter(d => d !== column)
        } else {
            clickedColumns.push(column)
        }
        
        if (clickedColumns.length == 0) {
            return data[year].breakdown
            console.log("0")
        } else if (clickedColumns.length == 1) {
            return data[year].breakdown.filter(d => d[clickedColumns[0]] === "all")
        } else if (clickedColumns.length == 2) {
            return data[year].breakdown.filter(d => d[clickedColumns[0]] === "all").filter(d => d[clickedColumns[1]] === "all")           
        } else if (clickableColumns.length == 3) {
            return data[year].breakdown.filter(d => d[clickedColumns[0]] === "all").filter(d => d[clickedColumns[1]] === "all").filter(d => d[clickedColumns[2]] === "all")
        }
    }

    let clickableColumns = {

    }

    let sortableColumns = {
                    'race' : 'Race',
                    'sex' : 'Sex',
                    'age' : 'Age',
                    'chart': '',
                    'diff_percent': 'Disparity',
                    'cases': 'Cases',
                    'relative_risk': 'Relative Risk',
                    }
</script>


<div class="body">
    {#if clicked == "FBI National Crime Information Center"}
    <div class="header">

        <h2>{displayData.total_cases.toLocaleString()} were reported missing in</h2>
        <select bind:value={year}>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
        </select>
    </div>
    {/if}

    {#if clicked == "National Missing and Unidentified Persons System"}
    <div class="header">

        <h2>{namus.length.toLocaleString()} active missing person cases in NAMUS</h2>

    </div>

    {/if}

    <div class="buttons">

        <h2>Explore missing person datasets:</h2>

        {#each ["FBI National Crime Information Center", "National Missing and Unidentified Persons System"] as button}
            <button 
                style = "opacity:{clicked == button ? 1 : 0.5};}"
                on:click={() => {clicked = button}}>
                {@html clicked == button ? "<ion-icon name='caret-forward-outline'></ion-icon>" + button : button}
            </button>
        {/each}

    </div>

    {#if clicked == "FBI National Crime Information Center"}
    <table class="sortable">

        <tr>
            {#each Object.keys(clickableColumns) as col}
                <th on:click={() => displayData.breakdown = click(col)}>{clickableColumns[col]}</th>
            {/each}
            {#each Object.keys(sortableColumns) as col}
                <th 
                    on:click={() => sort(col == 'chart' ? 'diff_percent' : col)}>
                    <div class="col-names">
                        <p>{sortableColumns[col]}</p> 
                        {@html sortBy.col == col ? sortBy.ascending == true ? "<ion-icon name='caret-down-outline'></ion-icon>" : "<ion-icon name='caret-up-outline'></ion-icon>" : ""}
                    </div>
                </th>
            {/each}
        </tr>

        {#each displayData.breakdown as row}
            <tr on:mouseover={() => hovered = row} on:focus={() => {}}  on:mouseleave={() => hovered = false}>
                <td>{row.race}</td>
                <td>{row.sex}</td>
                <td>{row.age}</td>
                <td>
                    <div class="chart-cell">
                        <div class="labels">
                            <p>% of Pop.</p>
                            <p>% of Cases</p>
                        </div>
                        <div class="chart">
                            <div class="bar-and-number">
                                <div 
                                    class="bar" 
                                    style="width: {row.pop_percent * barChartRange}px; background-color: {colorScaleBar(row.pop_percent)}"
                                    ></div>
                                <p>{Math.round(100* row.pop_percent)}%</p>
                            </div>
                            <div class="bar-and-number">
                                <div 
                                    class="bar" 
                                    style="width: {row.cases_percent * barChartRange}px; background-color: {colorScaleBar(row.cases_percent)}"
                                    ></div>
                                <p>{Math.round(100* row.cases_percent)}%</p>
                            </div>
                            <!-- <div class="bar" style="width: {Math.abs(row.diff_percent) * barChartRange}%; transform: translateX({row.diff_percent < 0 ? "calc(-100% - 1px)" : 0};"></div> -->
                        </div>
                    </div>
                </td>
                <td
                style="background-color: {colorScaleDisparity(row.diff_percent)}"
                >{Math.round(row.diff_percent*100)}%</td>
                <td
                style="background-color: {colorScaleCases(row.cases)}"
                >{row.cases.toLocaleString()}</td>
                <td
                style="background-color: {colorScaleRisk(row.relative_risk)}">
                {Math.round(100*row.relative_risk)/100} 
                <ion-icon name="calculator-outline" class="calc" on:click={() => row.clicked ? row.clicked = false : row.clicked = true} on:keydown={() => row.clicked ? row.clicked = false : row.clicked = true}></ion-icon>
            </td>
            </tr>
            {#if row.clicked}
            {#each Object.keys(row).slice(16, 23).filter(d => Math.round(100*row[d])/100) as item}
                <tr class="calc">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style="text-align: right">{(/relative_risk_(.*?)_isolated/g).exec(item)[1].replaceAll(/_/g, " & ")}</td>
                    <td></td>
                    <td></td>
                    {#if Object.keys(row).slice(16, 23).filter(d => Math.round(100*row[d])/100).slice(-1) == item}
                    <td style="border-bottom: 1px solid white">+ {Math.round(100*row[item])/100}</td>
                    {:else}
                    <td>{Math.round(100*row[item])/100}</td>
                    {/if}
                </tr>
            {/each}
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style="text-align: right">Total Relative Risk</td>
                    <td></td>
                    <td></td>
                    <td style="text-align: right">{Math.round(100*row.relative_risk)/100}</td>
                </tr>
            {/if}
        {/each}

    </table>


    <div class="bee">

        <div class="bee-title">
            <h2>Relative risk</h2>
            <h2>labeled by</h2>
            <select bind:value={zKey}>
                {#each ["race", "sex", "age"] as option}
                    <option value={option}>{option}</option>
                {/each}
            </select>
            <h2>sorted by</h2>
            <select bind:value={group}>
                {#each ["none", "age", "sex", "race"] as group}
                    <option value={group}>{group}</option>
                {/each}
            </select>      
        </div>
        
        <div class="chart">
            <Chart
                {zKey}
                {year}
                {groupBy}
                {xKey}
                {hovered}
            />
        </div>
    </div>
    {/if}

    {#if clicked == "National Missing and Unidentified Persons System"}
        <div class="bee">
            <Searchbar />
        </div>            
    {/if}

    <div class="map-container" style="visibility: {clicked == 'National Missing and Unidentified Persons System' ? 'visible' : "hidden"};">
        <p><ion-icon name="ellipse" class="dot"></ion-icon> Each dot represents the last known location of every active cases in the NAMUS database</p>
        <div class="map">
            <Map />
        </div>
        <div class="key">
            <Key 
            shape={"circle"}
            />
        </div>
    </div>
    
</div>

<style lang="sass">

    $detour-headline-font: Georgia
    $detour-body-font: 'Rubik', Segoe UI
    $detour-orange: #fbb812


    @keyframes blink
        0%
            opacity: 0
        50%
            opacity: 1
        100%
            opacity: 0

    ion-icon.dot
        font-size: 10px
        color: red
        animation: blink 2s infinite
        padding-top: 2px

    ion-icon.calc
        cursor: pointer

    

    .body
        width: 100%
        padding-top: 70px
        background-color: #282729
        display: grid
        grid-template-columns: 2fr 3fr 3fr
        grid-template-rows: 110px 4fr
        grid-template-areas: "header buttons bee" "table table bee"
        grid-gap: 5px

    .header
        grid-area: header
        padding: 10px
        

    .buttons
        grid-area: buttons
        display: flex
        justify-content: start
        align-items: start
        width: 100%
        flex-direction: column
        padding-top: 10px

    .map-container
        grid-area: table
        display: flex
        flex-direction: column
        justify-content: start
        align-items: center
        gap: 10px
        padding: 10px
        .key
            display: flex
            justify-content: center
            align-items: center
        .map
            width: 85%
            height: 85%
            padding-left: 15px
        p 
            width: 100%
            text-align: center
        

    table
        grid-area: table
        border-collapse: collapse
        margin: 10px
        td, th
            border-bottom: 1px solid rgba(255,255,255,0.7)
            margin: 0
            padding: 2px
            font-family: $detour-body-font
            font-size: 14px
            font-weight: 400
            color: white
            text-align: center
            text-transform: capitalize
            width: 70px
        th
            cursor: pointer
            height: 40px
            .col-names
                display: flex
                justify-content: center
                align-items: center
        .calc
            td 
                border-bottom: none
                text-align: right



    .chart-cell
        display: flex
        justify-content: center
        align-items: center
        gap: 5px
        width: 120px
        height: 100%
        .labels
            display: flex
            flex-direction: column
            justify-content: center
            align-items: end
            gap: 4px
            p
                margin: 0
                padding: 0
                font-family: $detour-body-font
                font-size: 12px
                font-weight: 400
                color: white
                line-height: 1
                height: 20px
                display: flex
                justify-content: center
                align-items: center
        .chart
            width: 40px
            height: 50px
            border-left: 2px solid rgba(255,255,255,0.7)
            display: flex
            flex-direction: column
            justify-content: center
            align-items: start
            gap: 4px
            .bar-and-number
                display: flex
                justify-content: start
                align-items: center
                gap: 2px
                .bar
                    height: 20px
                    background-color: #E3E4FA
                p
                    font-family: $detour-body-font
                    font-size: 12px
                    font-weight: 400
                    color: white
                    margin: 0
                    padding: 0
    .bee
        grid-area: bee
        padding: 10px 20px 20px 20px
        height: calc(100vh - 70px - 20px - 20px)
        display: flex
        flex-direction: column
        justify-content: start
        align-items: center
        gap: 10px
        .bee-title
            width: 100%
        .chart
            margin-top: 50px
            width: 100%
            height: 63vh
        .groupby
            font-family: $detour-body-font
            font-size: 14px
            font-weight: 400
            color: white



    // basic

    h2
        color: white
        font-size: 30px
        font-weight: 100
        margin: 0
        padding: 0
        font-family: $detour-headline-font
        display: inline

    p
        color: white
        font-size: 14px
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



</style>
