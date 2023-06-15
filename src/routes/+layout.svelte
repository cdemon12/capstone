<script lang="ts">
    import Choose from "./_components/Choose.svelte";
    import Detour from "./_components/Detour.svelte";
	import Footer from "./_components/Footer.svelte";

</script>

<Detour />

<main>

<article itemscope itemtype="http://schema.org/Article">

<slot />

</article>

</main>

<Footer />