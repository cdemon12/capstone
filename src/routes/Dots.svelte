<script lang="ts">
    import small_bubbles_json from "./small_bubble.json"
    import big_bubbles_json from "./big_bubbles.json"

    import { scaleLinear } from "d3-scale";
    import { tweened } from "svelte/motion";
    import { cubicOut } from 'svelte/easing';

    //data template:  data = [{sex:"sex", race:"race", age:"age", r:"bubble_weight", col:"col", row:"row"},
    //                         {sex:"sex", race:"race", age:"age", r:"bubble_weight", col:"col", row:"row"}]

    let radius = function (area:number) {
        return(Math.sqrt(area/(2*Math.PI)))
    }

    let big_bubble_positions = {
        female_asian_minor: {x: 2, y: 3},
        female_asian_adult: {x: 10, y: 10},
        female_black_minor: {x: 2, y: 10},
        female_black_adult: {x: 10, y: 10},
        female_indian_minor: {x: 10, y: 10},
        female_indian_adult: {x: 10, y: 10},
        female_white_minor: {x: 10, y: 10},
        female_white_adult: {x: 10, y: 10},
        male_asian_minor: {x: 6, y: 8},
        male_asian_adult: {x: 10, y: 10},
        male_black_minor: {x: 10, y: 10},
        male_black_adult: {x: 10, y: 10},
        male_indian_minor: {x: 10, y: 10},
        male_indian_adult: {x: 10, y: 10},
        male_white_minor: {x: 10, y: 10},
        male_white_adult: {x: 10, y: 10},
    }


    let row_positon = function(x) {
        if (x[0] == "female") {
            if (x[1] == "black") {
                if (x[2] = "adult"){
                    return big_bubble_positions.female_black_adult.y
                } else {
                    return big_bubble_positions.female_black_minor.y
                }
            } else if (x[1] == "white") {
                if (x[2] = "adult"){
                    return big_bubble_positions.female_white_adult.y
                } else {
                    return big_bubble_positions.female_white_minor.y
                } 
            } else if (x[1] == "indian"){
                if (x[2] = "adult"){
                    return big_bubble_positions.female_indian_adult.y
                } else {
                    return big_bubble_positions.female_indian_minor.y
                } 
            } else {
                if (x[2] = "adult"){
                    return big_bubble_positions.female_asian_adult.y
                } else {
                    return big_bubble_positions.female_asian_minor.y
                } 
            }
        } else {
            if (x[1] == "black") {
                if (x[2] = "adult"){
                    return big_bubble_positions.male_black_adult.y
                } else {
                    return big_bubble_positions.male_black_minor.y
                }
            } else if (x[1] == "white") {
                if (x[2] = "adult"){
                    return big_bubble_positions.male_white_adult.y
                } else {
                    return big_bubble_positions.male_white_minor.y
                }
            } else if (x[1] == "indian"){
                if (x[2] = "adult"){
                    return big_bubble_positions.male_indian_adult.y
                } else {
                    return big_bubble_positions.male_indian_minor.y
                } 
            } else {
                if (x[2] = "adult"){
                    return big_bubble_positions.male_asian_adult.y
                } else {
                    return big_bubble_positions.male_asian_minor.y
                } 
            }
        }
    }

    let col_positon = function(x) {
        if (x[0] == "female") {
            if (x[1] == "black") {
                if (x[2] = "adult"){
                    return big_bubble_positions.female_black_adult.x
                } else {
                    return big_bubble_positions.female_black_minor.x
                }
            } else if (x[1] == "white") {
                if (x[2] = "adult"){
                    return big_bubble_positions.female_white_adult.x
                } else {
                    return big_bubble_positions.female_white_minor.x
                } 
            } else if (x[1] == "indian"){
                if (x[2] = "adult"){
                    return big_bubble_positions.female_indian_adult.x
                } else {
                    return big_bubble_positions.female_indian_minor.x
                } 
            } else {
                if (x[2] = "adult"){
                    return big_bubble_positions.female_asian_adult.x
                } else {
                    return big_bubble_positions.female_asian_minor.x
                } 
            }
        } else {
            if (x[1] == "black") {
                if (x[2] = "adult"){
                    return big_bubble_positions.male_black_adult.x
                } else {
                    return big_bubble_positions.male_black_minor.x
                }
            } else if (x[1] == "white") {
                if (x[2] = "adult"){
                    return big_bubble_positions.male_white_adult.x
                } else {
                    return big_bubble_positions.male_white_minor.x
                }
            } else if (x[1] == "indian"){
                if (x[2] = "adult"){
                    return big_bubble_positions.male_indian_adult.x
                } else {
                    return big_bubble_positions.male_indian_minor.x
                } 
            } else {
                if (x[2] = "adult"){
                    return big_bubble_positions.male_asian_adult.x
                } else {
                    return big_bubble_positions.male_asian_minor.x
                } 
            }
        }
    }

    let small_bubble_data = small_bubbles_json.map(x => {
        const [sex, race, age, r, col, row] =
        [x[0], 
        x[1], 
        x[2], 
        radius(Number(x[10])), 
        Number(x[14]), 
        Number(x[13])];
        return {sex, race, age, r, col, row};
    });

    let big_bubble_data = big_bubbles_json.map(x => {
        const [sex, race, age, r, col, row] =
        [x[0], 
        x[1], 
        x[2],
        0,
        Number(col_positon(x)),
        Number(row_positon(x))];
        return {sex, race, age, r, col, row};
    });

    console.log(row_positon(big_bubble_data[4]));

    let big_bubbles =  tweened(big_bubble_data);

    let step:number = 0;

    let nextstep = function () {
        step = step + 1;
    };

    let small_bubbles = tweened(small_bubble_data, {duration:3000, easing:cubicOut});

    $: {if (step == 1) {
        small_bubble_data = small_bubbles_json.map(x => {
            const [sex, race, age, r, col, row] =
            [x[0], 
            x[1], 
            x[2], 
            1, 
            Number(x[14]), 
            Number(x[13])];
            return {sex, race, age, r, col, row};
        });
        small_bubbles.set(small_bubble_data)
    }
        if (step == 2) {
        big_bubble_data = big_bubbles_json.map(x => {
            const [sex, race, age, r, col, row] =
            [x[0], 
            x[1], 
            x[2],
            radius(Number(x[12])),
            Number(col_positon(x)),
            Number(row_positon(x))];
            return {sex, race, age, r, col, row};
            });
            big_bubbles.set(big_bubble_data)
        small_bubble_data = small_bubbles_json.map(x => {
            const [sex, race, age, r, col, row] =
            [x[0], 
            x[1], 
            x[2], 
            1, 
            Number(col_positon(x)),
            Number(row_positon(x))];
            return {sex, race, age, r, col, row};
        });
        small_bubbles.set(small_bubble_data)
        }
    }
    let bubble_factor = 15;
    
    let bubble_highlight_index:number = 4;
    let bubble_legend_index:number = 0;

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

<button on:click={nextstep}>Next</button>

<svg class = "plot">
    {#each $small_bubbles as b}
        <circle 
        cx={xScale(b.row)} 
        cy={yScale(b.col)} 
        r={bubble_factor*b.r} 
        opacity="20" 
        fill={(b.race == "black") ? "RoyalBlue" : "DarkGrey"}
        />
    {/each}
    <!-- Bubble Highlight -->
        <circle
        cx={xScale(small_bubble_data[bubble_highlight_index].row)}
        cy={yScale(small_bubble_data[bubble_highlight_index].col)}
        r={bubble_factor*small_bubble_data[bubble_highlight_index].r + 1}
        fill = "none"
        stroke = "black"
        stroke-width = "2.5"
        />
        <line 
        x1={xScale(small_bubble_data[bubble_highlight_index].row) + bubble_factor*small_bubble_data[bubble_highlight_index].r + 1} 
        x2={xScale(small_bubble_data[bubble_highlight_index].row) + bubble_factor*small_bubble_data[bubble_highlight_index].r + 1 + 60}
        y1={yScale(small_bubble_data[bubble_highlight_index].col)}
        y2={yScale(small_bubble_data[bubble_highlight_index].col) + 60}
        stroke = "black"
        stroke-width = "2.5"
        />
        <rect
        x={xScale(small_bubble_data[bubble_highlight_index].row) + bubble_factor*small_bubble_data[bubble_highlight_index].r + 1 + 60 -5}
        y={yScale(small_bubble_data[bubble_highlight_index].col) + 60 - 16}
        width = "560"
        height = "25"
        fill = "white"
        stroke = "black"
        />
        <text
        x={xScale(small_bubble_data[bubble_highlight_index].row) + bubble_factor*small_bubble_data[bubble_highlight_index].r + 1 + 60}
        y={yScale(small_bubble_data[bubble_highlight_index].col) + 60}
        >
        The size of the bubble represents the number of people per 5,XXX who gone missing.
        </text>

    <!-- Legend -->
        <line
        x1={xScale(small_bubble_data[bubble_legend_index].row) + (bubble_factor*small_bubble_data[bubble_legend_index].r)}
        x2={xScale(small_bubble_data[bubble_legend_index].row) + (bubble_factor*small_bubble_data[bubble_legend_index].r)}
        y1={yScale(small_bubble_data[bubble_legend_index].col) + (bubble_factor*small_bubble_data[bubble_legend_index].r + 1 + 5)}
        y2={yScale(small_bubble_data[bubble_legend_index].col) - (bubble_factor*small_bubble_data[bubble_legend_index].r + 1 + 5)}
        stroke = "black"
        stroke-width = "2"
        />
        <line
        x1={xScale(small_bubble_data[bubble_legend_index].row) - (bubble_factor*small_bubble_data[bubble_legend_index].r)}
        x2={xScale(small_bubble_data[bubble_legend_index].row) - (bubble_factor*small_bubble_data[bubble_legend_index].r)}
        y1={yScale(small_bubble_data[bubble_legend_index].col) + (bubble_factor*small_bubble_data[bubble_legend_index].r + 1 + 5)}
        y2={yScale(small_bubble_data[bubble_legend_index].col) - (bubble_factor*small_bubble_data[bubble_legend_index].r + 1 + 5)}
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
        x1={xScale(small_bubble_data[bubble_legend_index].row) - (bubble_factor*small_bubble_data[bubble_legend_index].r) +5} 
        y1={yScale(small_bubble_data[bubble_legend_index].col) - (bubble_factor*small_bubble_data[bubble_legend_index].r + 1 + 3)} 
        x2={xScale(small_bubble_data[bubble_legend_index].row) + (bubble_factor*small_bubble_data[bubble_legend_index].r) -5} 
        y2={yScale(small_bubble_data[bubble_legend_index].col) - (bubble_factor*small_bubble_data[bubble_legend_index].r + 1 + 3)} 
        stroke="#000" 
        stroke-width="2" 
        marker-end="url(#endarrow)" 
        marker-start="url(#startarrow)" 
        />
    
    {#each $big_bubbles as b}
        <circle 
        cx={xScale(b.row)} 
        cy={yScale(b.col)} 
        r={bubble_factor*b.r} 
        opacity="20" 
        fill={(b.race == "black") ? "Red" : "Red"}
        />
    {/each}

        
</svg>

<style>
    .plot {
        width: 100vw;
        height: 100vh;
        margin: 0;
        padding: 0;
    }
</style>