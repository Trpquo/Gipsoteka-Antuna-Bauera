---
title: Zbirka moderne plastike u Gipsoteci
chapter: 3.1
coverImage: 
imgRoot: postavi/moderna/
layout: basic
---

# { title }

## Postav zbirke moderne plastike

### [ Zapadna zgrada ]

>Kod određivanja izložbenog prostora za pojedinog majstora i kod materijala za izlaganje držali smo se u prvom redu **znanstvenog principa** (…) izbor materijala bio je uglavnom usmjeren na značaj i glavne karakteristike cjelokupnog opusa dotičnog majstora….

**Estetski princip** postava bio je primaran za kompoziciju kako pojedine dvorane, tako i cjeline ukupnog izložbenog prostora. 

> (...) da ne budu pretrpane (...) da ima dovoljnu distancu za promatranje ...
![Stalni postav Zbirke moderne plastike Gipsoteke, dvorana na drugom katu, 1947., Knjiga negativa Gliptoteke HAZU, G/J-68]({imgRoot}2.jpg 'Stalni postav Zbirke moderne plastike Gipsoteke')

Bauer promatra izložbenu dvoranu kao jedinstvenu kompozicija kojoj _(…) sve dimenzije moraju biti usklađene tako da jedna drugu ne pokriva, a da jedna popuni prazninu druge figure._

> (…) Nastojalo se kod postava izložbenih objekata paziti na **izvor svjetla** (...)
![Dvorana „Meštrović“ postav u Gipsoteci, Fototeka Gliptoteke HAZU, F-432]({imgRoot}1.jpg 'Dvorana „Meštrović“')

> **Postament** na kojem je plastika izložena je isto tako odlučujući faktor (…) visina se mora odrediti prema samoj figuri.

> Za **dekoraciju prostora** mogu se upotrebljavati najrazličitija sredstva… Izloženi su crteži (…) skice za spomenike pojedinih majstora…

Postav u zbirci moderne plastike izložen je uglavnom **kronološki**, odnosno _u granicama mogućnosti prema autorima._

<script>
    import Link from '$lib/gadgets/Link.svelte'
    import PDFviewer from '$lib/gadgets/PDFviewer.svelte'

    const pdfs = [
        {
            src: 'Antun-Bauer_Postav-zbirke-moderne-plastike-1948.pdf',
            description: '<strong>Antun Bauer</strong>: Postav zbirke moderne plastike, tipkopis, Zagreb 1948.pdf', 
            settings: { contrast: 1.2, brightness: .9, backup: "postav" }
        },
        {
            src: 'Analiza-postava-moderne-plastike_Bauer.pdf',
            description: '<strong>Antun Bauer</strong>: Analiza postava zbirke moderne plastike u Gipsoteci, tipkopis, Zagreb 1948.pdf', 
            settings: { contrast: 1.5, brightness: 1.1, backup: "analiza" }
        },
    ]

</script>

{#each pdfs as { src, description, settings } }
<Link rel="external" href={ `/downloads/${ src }` } target={ settings.backup }>
    <span slot="link">{@html description }</span>
    <span slot="gadget"><PDFviewer src={ `/downloads/${ src }` } { settings } /></span>
</Link>
{/each}