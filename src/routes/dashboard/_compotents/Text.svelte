<script>
	import { fade, fly, slide } from 'svelte/transition';
    import { open } from '../open';
    import Clock from './Clock.svelte';

</script>

<div class="button" on:click={() => open.set(!$open)} on:keydown>
    Click to read more
</div>

{#if $open}

        <div class="article" in:slide out:slide>

            <!-- <div class="clock">
                <Clock />
            </div> -->

            <h1>A case per minute</h1>
            <h2>Missing persons by the numbers</h2>
            <p class="byline">By <a href="/team/cole">Cole Schnell</a> and <a href="/team/kristin">Kristin Kuchno</a>, June 16, 2023</p>

            <p style="font-style: italic; text-align: center;">This one of several articles in <a href="/">a series about Daniel Robinson and missing persons in U.S.</a> To learn more, read the <a href="/publishers-note">Publisher's Note</a>.</p>

            <p>One person is reported missing every minute in the U.S. on average. Nearly two years ago, in one of those minutes, Daniel Robinson was reported missing. Since he has been missing, about a million minutes have passed and about a million people have been reported missing.</p>
            <p>Still remaining unfound, Daniel Robinson is less fortunate than most; 98% of reported missing person cases are resolved within a year. Why was Daniel Robinson less fortunate than others? There are perhaps many unknown reasons — but the data tells us that race is a factor.</p>
            <p>Four in 1,000 Black Americans are reported missing every year, compared to one in 1,000 White Americans. And while most cases are resolved quickly, if a Black child is missing, it is more likely to be unresolved longer or remain unresolved altogether, according to a 2018 study of missing children in New York. This is most likely because searches for Black missing person cases often have less support, on top of the already limited resources for missing person cases.</p>
            <p>Daniel’s father, David Robinson, has been searching for his son for nearly two years to no avail. At the beginning of his search, for his initial meeting with Buckeye police, David Robinson asked Larnell Farmer of the West Valley NAACP in Arizona to join him.</p>
            <p>“The lack of sympathy, empathy, respect that they gave David on that day, it was horrible,” Farmer said. In this meeting, Farmer said the police proposed a theory that involved Daniel Robinson disappearing under his own fruition. This is quite common in Black missing person cases.</p>
            <p>When police reports are filed for missing children of color, it’s usually assumed that they’re runaways, said Derrica Wilson, who co-founded Black and Missing Foundation. When adults of color go missing, they’re labeled as criminals. This stereotyping has a dehumanizing and desensitizing effect, she said.</p>
            <p>This placing of blame on the missing individual affects how the police act in the vital, first days someone is missing. For instance, if a child is labeled as a runaway, the police can’t issue an AMBER alert, one of the most successful tools in abduction cases.</p>
            <p>This common disregard is also relayed into media coverage, another important tool in locating missing persons. Nine percent of media missing children mentions involve Black children, despite making up 36% of cases, according to a 2015 study of media coverage of missing children. “When a person of color goes missing, it’s barely reported in the local news,” said Bishop Anthony Holt, president of the NAACP chapter local to where Daniel Robinson went missing. “So the question is, is one life better than another? Or is one life more valuable than another?”</p>
            <div class="line">x</div>
            <h4>Deeper dive into the data</h4>
            <p>Over the last three years, 939,191 White Americans were reported missing to the FBI, compared to 552,835 Black Americans reported missing.</p>
            <p>However, after adjusting for the size of the White population, White Americans are reported missing three times fewer than Black Americans.</p>
            <p>It is also notable that, after adjusting for population, American Indian women surpass White Americans, making them the third most likely to go missing along the intersection of race and sex, following Black women and men. Unlike other cases, American Indian disappearances are typically related to violent crimes, with murder being the third most common death for Indian women, according to the Urban Indian Health Institute. This phenomenon has sparked activism, leading to the unanimous passage of the Not Invisible Act in 2019. “There is still much work to do to combat the epidemic of missing and murdered Indigenous women and girls,” Co-sponsor Senator Catherine Cortez Masto (D-NV) said after the bill was extended in late 2022.</p>
            <p>While there are large disparities among races, age is the largest disparity among the categories — sex, race and age —  provided by the FBI. Children are 65% of cases before adjusting for the much larger adult population; after population adjustment, 87% of cases are younger than 18. On the bright side, missing children are more likely to be found and go missing for a shorter period than adults, with 99.5% of missing children being found, according to a 2018 study on missing children cases in New York. </p>
            <p>Examining sex, age and race alone doesn’t reveal the full disparities in missing person cases. At the intersections, there are additional effects beyond just combining the categories’ effects. For instance, Black minors are reported missing 7 times more than the average American, while Black Americans and minors, individually, are reported missing only 3 times more.</p>
        </div>

{/if}

<style lang="sass">

    $detour-headline-font: Georgia
    $detour-body-font: 'Rubik', Segoe UI
    $detour-orange: #fbb812

    .button
        position: fixed
        z-index: 99999
        bottom: 20px
        right: 20px
        height: 50px
        border-radius: 25px
        padding: 0 20px
        color: white
        cursor: pointer
        display: flex
        justify-content: center
        align-items: center
        border: 2px solid white
        background-color: #282729
        font-size: 24px
        font-family: $detour-body-font
        ion-icon
            visibility: visible
        
    .article
        position: fixed
        z-index: 99998
        top: 90px
        left: calc((100% - min(calc(100% - 80px), 1120px) - 80px) / 2)
        height: calc(100vh - 190px)
        background-color: #282729
        width: min(calc(100% - 80px), 1120px)
        border: 1px solid white
        color: white
        display: flex
        flex-direction: column
        justify-content: start
        align-items: center
        gap: 20px
        padding: 40px
        overflow-y: scroll
        scrollbar-width: none
        -ms-overflow-style: none
        &::-webkit-scrollbar
            display: none
        h1
            font-family: $detour-headline-font
            font-size: 3rem
            font-weight: 700
            text-align: center
            margin: 0
            padding: 0
            text-shadow: 0 10px 10px rgba(0,0,0,0.5)
            padding-top: 50px
        h2
            font-family: $detour-body-font
            font-size: 2rem
            font-weight: 400
            text-align: center
            margin: 0
            padding: 0
        p
            font-family: $detour-body-font
            font-size: 1.1rem
            font-weight: 400
            margin: 0
            padding: 0
            width: 100%
            line-height: 1.5rem
        .byline
            font-style: italic
            text-align: center
            font-size: 1.05 rem
        a
            color: white
            text-decoration: underline
            &:hover
                color: $detour-orange
        h4
            font-size: 1.8rem
            padding: 0
            width: 100%
            text-align: left
            float: right
            font-family: $detour-headline-font
            margin: 0
        
        .line
            width: 70%
            height: 2px
            background-color: #fbb812
            margin: 0 20px
            color: rgba(0, 0, 0, 0)





</style>