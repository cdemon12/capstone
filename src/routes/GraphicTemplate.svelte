<script lang="ts">
    import json from "./entry_and_pop.json"
    import { scaleLinear } from "d3-scale";

    //data template:  data = [{sex:"sex", race:"race", age:"age", r:"bubble_weight", col:"col", row:"row"},
    //                         {sex:"sex", race:"race", age:"age", r:"bubble_weight", col:"col", row:"row"}]

    let bubble_data = json.map(x => {
        const [sex, race, age, r, col, row] =
        [x[0], 
        x[1], 
        x[2], 
        Number(x[10]), 
        Number(x[13]), 
        Number(x[12])];
        return {sex, race, age, r, col, row};
    });
    
/*     let bubble_dimensions = {
        x: xScale(b.row),
        y: yScale(b.col),
        r: 2.5*b.r
        
    } */
    
    let innerHeight:number, innerWidth:number, xScale:Function, yScale:Function;

    $:{
        innerWidth;
        innerHeight;

        xScale = scaleLinear()
            .domain([0, 42])
            .range([0, innerWidth]);

        yScale = scaleLinear()
            .domain([26, 0])
            .range([innerHeight, 0]);
    }

</script>

<svelte:window   
    bind:innerWidth={innerWidth}
    bind:innerHeight={innerHeight}/>

<svg class = "plot">
    {#each bubble_data as b}
        <circle 
        cx={xScale(b.row)} 
        cy={yScale(b.col)} 
        r={14*b.r} 
        opacity="20" 
        fill={(b.race == "black") ? "RoyalBlue" : "DarkGrey"}
        />
    {/each}
        <circle
        cx={xScale(bubble_data[2].row)}
        cy={yScale(bubble_data[2].col)}
        r={14*bubble_data[0].r + 1}
        fill = "none"
        stroke = "black"
        stroke-width = "2.5"
        />
        <circle
        cx={xScale(bubble_data[1024].row)}
        cy={yScale(bubble_data[1024].col)}
        r={14*bubble_data[1024].r + 2}
        fill = "none"
        stroke = "black"
        stroke-width = "4"
        />
        <line 
        x1={xScale(bubble_data[2].row) + 14*bubble_data[2].r + 1} 
        x2={xScale(bubble_data[2].row) + 14*bubble_data[2].r + 1 + 60}
        y1={yScale(bubble_data[2].col)}
        y2={yScale(bubble_data[2].col) + 60}
        stroke = "black"
        stroke-width = "2.5"
        />
        <rect
        x={xScale(bubble_data[2].row) + 14*bubble_data[0].r + 1 + 60 -5}
        y={yScale(bubble_data[2].col) + 60 - 16}
        width = "560"
        height = "25"
        fill = "white"
        stroke = "black"
        />
        <text
        x={xScale(bubble_data[2].row) + 14*bubble_data[0].r + 1 + 60}
        y={yScale(bubble_data[2].col) + 60}
        >
        The size of the bubble represents the number of people per 5,XXX who gone missing.
        </text>
        <line
        x1={xScale(bubble_data[0].row) + (14*bubble_data[0].r)}
        x2={xScale(bubble_data[0].row) + (14*bubble_data[0].r)}
        y1={yScale(bubble_data[0].col) + (14*bubble_data[0].r + 1 + 5)}
        y2={yScale(bubble_data[0].col) - (14*bubble_data[0].r + 1 + 5)}
        stroke = "black"
        stroke-width = "2"
        />
        <line
        x1={xScale(bubble_data[0].row) - (14*bubble_data[0].r)}
        x2={xScale(bubble_data[0].row) - (14*bubble_data[0].r)}
        y1={yScale(bubble_data[0].col) + (14*bubble_data[0].r + 1 + 5)}
        y2={yScale(bubble_data[0].col) - (14*bubble_data[0].r + 1 + 5)}
        stroke = "black"
        stroke-width = "2"
        />

        <defs>
            <marker id="startarrow" markerWidth="2" markerHeight="2" 
            refX="2" refY="1" orient="auto">
            <polygon points="2 0, 2 2, 0 .75" fill="black" />
            </marker>
            <marker id="endarrow" markerWidth="2" markerHeight="2" 
            refX="0" refY="1" orient="auto" markerUnits="strokeWidth">
                <polygon points="0 0, 2 .75, 0 2" fill="black" />
            </marker>
        </defs>

        <line 
        x1={xScale(bubble_data[0].row) - (14*bubble_data[0].r) +5} 
        y1={yScale(bubble_data[0].col) - (14*bubble_data[0].r + 1 + 3)} 
        x2={xScale(bubble_data[0].row) + (14*bubble_data[0].r) -5} 
        y2={yScale(bubble_data[0].col) - (14*bubble_data[0].r + 1 + 3)} 
        stroke="#000" 
        stroke-width="2" 
        marker-end="url(#endarrow)" 
        marker-start="url(#startarrow)" 
        />
          


        
</svg>

<style>
    .plot {
        width: 100vw;
        height: 100vh;
        margin: 0;
        padding: 0;
    }
</style>