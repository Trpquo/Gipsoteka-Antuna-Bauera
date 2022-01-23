<script>
    import Article from '$lib/components/Article.svelte'
    import ContentDisplay from '$lib/gadgets/ContentDisplay.svelte'
    import { site } from '$lib/utils/stores'

    let content
    $: if ( $site ) {
        let { menu, posts, images } = $site
        content = { menu, posts, images }
    }
</script>

<Article title="Otvor">
    <h1>Dobrodošli!</h1>
    <p>Izložba u povodu <strong>110. godišnjice</strong> rođenja dr. sc. Antuna Bauera, osnivača Gipsoteke, prezentira njegov vizionarski pothvat i djelatnost ovog jedinstvenog muzeja u Hrvatskoj. Bauerove pionirske ideje i muzeološki rad prikazuju se na primjeru prvog muzeja koji je osnovao i u njega pretočio svoja iskustva i vizije.</p>

    {#if content }
       <ContentDisplay { content } />
    {/if}
</Article> 
