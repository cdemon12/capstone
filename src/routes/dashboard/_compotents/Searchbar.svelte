<script>
    import data from "../_data/namus";
    import { writable } from 'svelte/store';
    import Fuse from 'fuse.js/dist/fuse.js';

    const stateNames = {
  "AL": "Alabama",
  "AK": "Alaska",
  "AZ": "Arizona",
  "AR": "Arkansas",
  "CA": "California",
  "CO": "Colorado",
  "CT": "Connecticut",
  "DE": "Delaware",
  "FL": "Florida",
  "GA": "Georgia",
  "HI": "Hawaii",
  "ID": "Idaho",
  "IL": "Illinois",
  "IN": "Indiana",
  "IA": "Iowa",
  "KS": "Kansas",
  "KY": "Kentucky",
  "LA": "Louisiana",
  "ME": "Maine",
  "MD": "Maryland",
  "MA": "Massachusetts",
  "MI": "Michigan",
  "MN": "Minnesota",
  "MS": "Mississippi",
  "MO": "Missouri",
  "MT": "Montana",
  "NE": "Nebraska",
  "NV": "Nevada",
  "NH": "New Hampshire",
  "NJ": "New Jersey",
  "NM": "New Mexico",
  "NY": "New York",
  "NC": "North Carolina",
  "ND": "North Dakota",
  "OH": "Ohio",
  "OK": "Oklahoma",
  "OR": "Oregon",
  "PA": "Pennsylvania",
  "RI": "Rhode Island",
  "SC": "South Carolina",
  "SD": "South Dakota",
  "TN": "Tennessee",
  "TX": "Texas",
  "UT": "Utah",
  "VT": "Vermont",
  "VA": "Virginia",
  "WA": "Washington",
  "WV": "West Virginia",
  "WI": "Wisconsin",
  "WY": "Wyoming"
};

    const searchData = data.map((d) => ({
        ...d,
        search: Object.values(d).join(' ').toLowerCase() + " " + stateNames[d.state]
    }))

    let fuse = new Fuse(searchData, {
        keys: ['firstName', 'lastName', 'state', 'city', 'county', 'search'],
        threshold: 0.3,
        ignoreLocation: true,
        useExtendedSearch: true
        });

    let query = '';

    let filtered = writable();

    $: filtered.set(fuse.search(query, { limit: 20 }));
    $: console.log($filtered);

</script>

<div class="container">
<h3>Search the NAMUS missing persons database:</h3>    
<div class="search-bar">
    <input type="search" placeholder="'AZ' or 'Daniel Robinson' or 'Buckeye'" bind:value={query}>
</div>

{#if $filtered.length === 0}
    <div class="no-results">
        <p>
            National Missing and Unidentified Persons System or NamUs provides a public database of missing person cases. However, it is not a complete database.
        </p>
        <p>
            "Participation in NamUs is voluntary, therefore trends in missing person data may not correlate with actual missing person cases reported to law enforcement," a spokesperson for NamUs said over email. "We recommend analyzing data provided by National Crime Information Center."
        </p>
        <p>
           For instance, NamUs database has proportionally fewer Black missing persons cases relative to statistics provided by the FBI, which includes every missing person's case entry reported to law enforcement.
        </p>
    </div>
{:else}
<p class="disclaimer">{$filtered.length == 20 ? 'Only showing 20 results' : $filtered.length + ' results'}</p>
<ul>
    {#each $filtered as item}
        <li>
            <p>
                <b>Name:</b> <br/> {item.item.first_name.toLowerCase()} {item.item.last_name.toLowerCase()}
            </p> 
            <p>
                <b>Last seen in:</b> <br/> {item.item.city}, {item.item.state} 
            </p>
            <p>
                <b>Race / Ethnicity:</b> <br/> {item.item.race_ethnicity}
            </p>
        </li>
    {/each}
</ul>
{/if}
</div>

<style lang="sass">

$detour-body-font: 'Rubik', Segoe UI


.container
    display: flex
    flex-direction: column
    align-items: center
    justify-content: start
    width: 100%
    height: 100%
    gap: 5px
    .search-bar
        width: 100%
        height: 40px
        margin: 0
        input
            width: 100%
            height: 100%
            border: none
            border-radius: 4px
            padding: 0 20px
            font-size: 16px
            color: white
            font-family: $detour-body-font
            background-color: #3a3a3a
            margin: 0
            &:focus
                outline: none
            &::-webkit-search-cancel-button
                -webkit-appearance: none
    h3
        margin: 0
        padding: 0
        font-family: $detour-body-font
        font-size: 16px
        color: white
        text-align: left
        width: 100%
        
    .disclaimer
        color: white
        font-family: $detour-body-font
        font-size: 1.05rem
        font-style: italic
        width: 100%
        opacity: 0.6
        margin: 0
        padding: 5px 0  

    ul
        display: flex
        flex-direction: row
        flex-wrap: wrap
        width: 100%
        margin: 0
        padding: 0
        gap: 10px
        height: 100%
        overflow-y: scroll
        align-content: flex-start
        li
            list-style: none
            font-size: 16px
            color: #282729
            font-family: $detour-body-font
            margin: 0
            padding: 0px 5px 0px 10px
            border-radius: 4px
            background-color: #fff
            width: 170px
            height: 200px
            p
                text-transform: capitalize
                color: black
                opacity: 1
                
    .no-results
        width: calc(100% - 20px)
        background-color: rgba(0,0,0, 0.2)
        border-radius: 4px
        margin: 10px 0 0 0
        padding: 10px
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        height: 100%
        p
            color: white
            font-family: $detour-body-font
            font-size: 1.05rem
            font-style: italic
            width: 100%
            opacity: 0.6

</style>
