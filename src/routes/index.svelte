<script>
    import Article from '$lib/components/Article.svelte'
    import Img from '$lib/components/html/img.svelte'
    import ContentDisplay from '$lib/gadgets/ContentDisplay.svelte'
    import { site } from '$lib/utils/stores'

    let content
    $: if ( $site ) {
        let { menu, posts, images } = $site
        content = { menu, posts, images }
    }
</script>
<div style="margin-top: 5rem"></div>
<Article title="Dobrodošli!">
    {#if content }
        <ContentDisplay { content } />
    {/if}
    <p>
        Izložba u povodu <strong>110. godišnjice</strong> rođenja dr. sc. Antuna Bauera, osnivača Gipsoteke, prezentira njegov vizionarski pothvat i djelatnost ovog jedinstvenog muzeja u Hrvatskoj. Bauerove pionirske ideje i muzeološki rad prikazuju se na primjeru prvog muzeja koji je osnovao i u njega pretočio svoja iskustva i vizije.
    </p>
    <div class="showbox for4">
        <Img src="G-Č-8.jpg" alt="Antun Bauer u Arheološkom zavodu Sveučilišta, 1936., Fototeka Gliptoteke HAZU, G/Č-8" title="Antun Bauer u Arheološkom zavodu Sveučilišta, 1936." />
        <Img src="H-45.jpg" alt="Antun Bauer u Gipsoteci, prijenos Meštrovićevih odljeva, 1946.g. Fototeka Gliptoteke. HAZU G/H-45" title="Antun Bauer u Gipsoteci, 1946." />
        <Img src="P-2.jpg" alt="Antun Bauer u Trogiru 1939., Fototeka Gliptoteke HAZU, P-2" title="Antun Bauer u Trogiru, 1939." />
        <Img src="P-4.jpg" alt="Antun Bauer u Trogiru 1939., Fototeka Gliptoteke HAZU, P-4" title="Antun Bauer u Trogiru, 1939." />
    </div>

    
</Article> 
