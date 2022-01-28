---
title: Antička zbirka Gipsoteke
chapter: 3.2
coverImage: 
imgRoot: postavi/antika/
layout: basic
---

# { title }

### [ Južna zgrada ]

Sakupljanje sadrenih odljeva antičke skulpture u Hrvatskoj inicirao je 1892. godine Izidor Kršnjavi, koji nabavom antičkih sadrenih odljeva osniva prvi muzej gipsanih odljeva u Hrvatskoj (_Gipsmuseum_). Njegovu ideju u proširenom smislu nastavlja Antun Bauer osnivanjem Gipsoteke.[^1] U zbirci su sakupljeni odljevi kapitalnih djela grčkoga kiparstva od arhajskog do rimskog doba, iz raznih muzeja u Europi, ali i odljevi s našeg područja, iz rimske provincije Dalmacije. To je prva zbirka u Gipsoteci uređena tijekom 1945. godine i postavljena u četiri dvorane u stalnom postavu južne zgrade. Izložene su najpoznatije antičke skulpture poput Mironova _Bacača diska_, Polikletova _Dorifora_, Lizipova _Apoksiomena, Venere Milske, Gala na umoru, Apolona Belvederskog_ i _Laokontove skupine_, skulpture s Partenona i dr.

Bauer u svojim tekstovima i analizi postava ističe da je kriterij postava ove zbirke bio stilski. Naglašava kako je izložen u prostorijama bivšega tvorničkog postrojenja, koje nisu povezane zbog čega posjetioci nemaju kontinuitet obilaska, već se iz svake prostorije moraju vraćati istim putem. 

[^1]: Više u: Getaldić, Magdalena, _Izidor Kršnjavi &ndash; inicijator zbirke sadrenih odljeva antičke skulpture i Gyps-Museuma, Iso Kršnjavi &ndash; veliki utemeljitelj,_ ur. Mance, Ivana, Matijević, Zlatko, Institut za povijest umjetnosti, Hrvatski institut za povijest, Zagreb, 2015., 182-199.

<script>
    import Link from '$lib/gadgets/Link.svelte'
    import PDFviewer from '$lib/gadgets/PDFviewer.svelte'

    const description = '<strong>Antun Bauer</strong>: Gipsoteka &ndash; Zbirka grčke plastike, tipkopis, Zagreb 1949.pdf'
    const src = '/downloads/Antun-Bauer_Gipsoteka_Zbirka-grcke-plastike_1949.pdf'
    const settings = { contrast: 1.1, brightness: .95, backup: "plastika" }
</script>

<Link rel="external" href={ src } target={ settings.backup }>
    <span slot="link">{@html description }</span>
    <span slot="gadget"><PDFviewer { src } { settings } /></span>
</Link>