<script>
    import { scaleLinear } from 'd3-scale'
    import { dotHovered } from '../dotHovered';
    import { colHovered } from '../colHovered';

    export let displayData;
    export let show;
    let tableWidth;
    let barChartRange = 100
    let hovered = false
    let firstRowHeight = 270 - 50



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

    let colorScaleRiskIso = scaleLinear()
        .domain([-2.5, 0, 2.5])
        .range(["#4885ed", "white", "#db3236"])


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
		
		displayData = displayData.sort(sort);
	}

    $: click = (column) => {
        show[column] = !show[column]
    }

    let clickableColumns = {
                    'race' : 'Race',
                    'sex' : 'Sex',
                    'age' : 'Age',
    }

    $: sortableColumns = (innerWidth > 900) ? {
                    'chart': '',
                    'diff_percent': 'Disparity',
                    'cases': 'Cases',
                    'relative_risk': 'Relative Risk',
                    } : {
                    'cases': 'Cases',
                    'relative_risk': 'Relative Risk',
                    }
        

    let innerWidth = 0
</script>

<svelte:window bind:innerWidth/>

<div class="table">
    {#if $dotHovered !== {}}
    {#each displayData.filter(d => d.race === $dotHovered.race && d.age === $dotHovered.age && d.sex === $dotHovered.sex) as row}
    <table class="hovered" style="width:{tableWidth}px; position: absolute; top: {$dotHovered.y + firstRowHeight + 70}px;">
        <tr>
            {#each [row.race, row.sex, row.age] as cat}
                {#if cat == "all"}
                    <td style="background-color: #3a3a3a;"> - </td>
                {:else}
                    <td>{cat === "indian" ? "American Indian" : cat}</td>
                {/if}
            {/each}
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
            style="background-color: {colorScaleRisk(row.relative_risk)}"
            >
            {Math.round(100*row.relative_risk)/100} 
        </td>
    </table>
    {/each}
    {/if}
    <table bind:clientWidth={tableWidth}>

        <tr>
            {#each Object.keys(clickableColumns) as col}
                <th style="background-color: {show[col] ? '#282729' : '#3a3a3a'};"><div style="display: flex; flex-direction: row-reverse; align-items: center; justify-content: center; gap: 3px;">{@html (show[col] ? '<ion-icon name="checkmark-circle"></ion-icon>' : '<ion-icon name="close-circle"></ion-icon>')}{clickableColumns[col]}</div></th>
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

        {#each displayData as row}
            <tr on:mouseover={() => colHovered.set(row)} on:focus={() => {}}  on:mouseleave={() => colHovered.set(false)}>
                {#each [row.race, row.sex, row.age] as cat}
                    {#if cat == "all"}
                        <td style="background-color: #3a3a3a;"> - </td>
                    {:else}
                        <td>{cat === "indian" ? "American Indian" : cat}</td>
                    {/if}
                {/each}
                {#if innerWidth > 900}
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
            {/if}
                <td
                style="background-color: {colorScaleCases(row.cases)}"
                >{row.cases.toLocaleString()}</td>
                <td
                style="background-color: {colorScaleRisk(row.relative_risk)}"
                on:mouseover={() => row.clicked = true} 
                on:mouseleave={() => row.clicked = false}
                on:focus={() => row.clicked = true}
                on:blur={() => row.clicked = false}
                >
                {Math.round(100*row.relative_risk)/100}
                {#if innerWidth > 900} 
                <ion-icon name="calculator-outline" class="calc"></ion-icon>
                {/if}
            </td>
            </tr>
            {#if row.clicked}
                <tr class="calc">
                    <td colspan="3" style="border-bottom: none;"></td>
                    <td colspan="3">
                        <div class="lines">
                        <svg viewBox="0 0 270 40">
                            <text style="text-anchor:middle;" fill="white" font-size="12" x="135" y="13">Isolated relative risk</text>
                            <line x1="{135 + 135 / 2.5 * -2}" y1="39" x2="{135 + 135 / 2.5 * 2}" y2="39" stroke-width="1" stroke="white"/>
                            {#each [-2, -1, 0, 1, 2] as tick}
                                <line x1="{135 + 135 / 2.5 * tick}" y1="35" x2="{135 + 135 / 2.5 * tick}" y2="39" stroke="white" stroke-width="1"></line>
                                <text x="{135 + 135 / 2.5 * tick}" y="30" fill="white" text-anchor="middle" font-size="10px">{tick}</text>
                            {/each}
                        </svg>
                        </div>
                    </td>
                    <td>1 <br/>(normal risk)</td>
                </tr>
            {#each Object.keys(row).slice(16, 23).filter(d => Math.round(100*row[d])/100) as item}
                <tr class="calc">
                    {#each ["race", "sex", "age"] as cat}
                    {#if (/relative_risk_(.*?)_isolated/g).exec(item)[1].split("_").includes(cat)}
                    <td style="text-align: center; border-bottom: 1px dotted white;">{row[cat]}</td>
                    {:else}
                    <td style="border-bottom: 1px dotted white;"></td>
                    {/if}
                    {/each}
                    <td colspan="3" style="border-bottom: 1px dotted white;">
                        <div class="lines">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 20">
                        <defs>
                            <marker id="pos" markerWidth="10" markerHeight="7" 
                            refX="0" refY="1" orient="auto" fill="#db3236">
                            <polyline points="0 0, 1.5 1, 0 2"  />
                            </marker>
                            <marker id="neg" markerWidth="10" markerHeight="7" 
                            refX="0" refY="1" orient="auto" fill="#4885ed">
                            <polyline points="0 0, 1.5 1, 0 2"  />
                            </marker>
                        </defs>
                        <line x1="{135 + 135 / 2.5 * row[item] < 0 ? 135 + 135 / 2.5 * row[item] : 135}" y1="10" x2="{135 + 135 / 2.5 * row[item] > 0 ? 135 + 135 / 2.5 * row[item] : 135}" y2="10" 
                        stroke="{row[item] > 0 ? "#db3236" :"#4885ed"}" 
                        stroke-width="4" marker-end="url({row[item] > 0 ? "#pos" :"#neg"})"/>
                        <line x1="135" y1="20" x2="135" y2="0" stroke="white" stroke-width="1"></line>
                        </svg>
                        </div>
                    </td>
                    <!-- <td colspan="3" style="text-align: right; text-transform: none;">{(/relative_risk_(.*?)_isolated/g).exec(item)[1].split("_").map(d => row[d]).join(', ')}</td> -->
                    {#if Object.keys(row).slice(16, 23).filter(d => Math.round(100*row[d])/100).slice(-1) == item}
                    <td><div style="border-bottom: 1px solid white; display: flex; justify-content: space-between; align-items: center; width: 100%; height: 24px;"><span>+</span><span>{Math.round(100*row[item])/100}</span></div></td>
                    {:else}
                    <td style="border-bottom: 1px dotted white;">{Math.round(100*row[item])/100}</td>
                    {/if}
                </tr>
            {/each}
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td colspan="3" style="text-align: right">Total Relative Risk</td>
                    <td style="text-align: right">{Math.round(100*row.relative_risk)/100}</td>
                </tr>
            {/if}
        {/each}

    </table>
</div>

<style lang="sass">

    $detour-headline-font: Georgia
    $detour-body-font: 'Rubik', Segoe UI
    $detour-orange: #fbb812

    ion-icon.calc
        cursor: pointer

    .table
        width: 100%

    .hovered
        z-index: 100
        background-color: #282729
        border: 2px solid white
        position: relative
        transform: translateY(50%)
        box-shadow: 0 0 10px rgba(0,0,0,0.5)




    table
        border-collapse: collapse
        width: 100%
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
            height: 40px
        th
            cursor: pointer
            height: 40px
            .col-names
                display: flex
                justify-content: center
                align-items: center
        .calc
            td 
                text-align: right
                border-bottom: none
                padding: 0
                height: 20px
            .lines
                display: flex
                justify-content: center
                align-items: center
                colspan: 3
                width: 100%
                height: 100%
                svg
                    width: 100%
                    height: 100%



    .chart-cell
        display: flex
        justify-content: start
        align-items: center
        gap: 5px
        width: 140px
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
