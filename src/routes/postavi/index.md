---
title: Postavi u Gipsoteci
chapter: 3
---

# { title }

 Stalni postavi formiraju se od ulaska muzeja u zgrade u Medvedgradskoj ulici u tvorničkom kompleksu. Od osnutka muzeja zbirke se sustavno povećavaju novim akvizicijama. Prvi postav otvoren za javnost bila je _Zbirka antičke skulpture_ 1945. godine, a zatim _Zbirka modernoga kiparstva_ 1947.  godine, koja postaje naša najveća kolekcija modernog kiparstva gdje se u postavu  izlažu pojedini opusi i tematske cjeline najznačajnijih hrvatskih kipara.


> Muzeji moraju odgojiti publiku i dati im kriterij vrijednosti. ¸

<script>
    import ContentDisplay from '$lib/gadgets/ContentDisplay.svelte'
    import { site } from '$lib/utils/stores'

    let content
    $: if ( $site ) {
        let { menu, posts, images } = $site
        // console.log( menu )
        content = { 
            posts,
            images,
            menu: menu.find(s=> s.slug === '/postavi').sub
        }
    }
</script>

{#if content }
    <ContentDisplay { content } />
{/if}