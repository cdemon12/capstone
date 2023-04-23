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
        keys: ['search'],
        threshold: 0.3,
        ignoreLocation: true,
        useExtendedSearch: true
        });

    let query = '';

    let filtered = writable();

    $: filtered.set(fuse.search(query, { limit: 8 }));

</script>

<div class="container">
<div class="search-bar">
    <input type="search" placeholder="Search the NamUs Missing Persons Database e.g. 'AZ' or 'Daniel Robinson'" bind:value={query}>
</div>

<ul>
    {#each $filtered.slice(0,10) as item}
        <li>
            <p>
                <b>Name:</b> <br/> {item.item.first_name.toLowerCase()} {item.item.last_name.toLowerCase()}
            </p> 
            <p>
                <b>Last since in:</b> <br/> {item.item.city}, {item.item.state} 
            </p>
            <p>
                <b>Race / Ethnicity:</b> <br/> {item.item.race_ethnicity}
            </p>
        </li>
    {/each}
</ul>
</div>

<style lang="sass">

$detour-body-font: halyard-display, Segoe UI


.container
    display: flex
    flex-direction: column
    align-items: center
    justify-content: start
    width: 100%
    background-color: #282729
    .search-bar
        width: 650px
        height: 40px
        input
            width: 100%
            height: 100%
            border: none
            border-radius: 4px
            padding: 0 20px
            font-size: 16px
            color: #282729
            font-family: $detour-body-font
            &:focus
                outline: none
    ul
        display: flex
        flex-direction: row
        flex-wrap: wrap
        width: 770px
        margin: 10px 0 0 0
        padding: 0
        gap: 10px
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
            p
                text-transform: capitalize

</style>
