<script>
    import { site } from '$lib/utils/stores'

    export let path

    console.log( path )

    let breadcrumbs, last

    $: if ( $site ) {
        let sitemap = $site.menu
        console.log( sitemap )
        
        let steps = path.split('/').filter( p=> !!p ).reduce( ( crumbs, p )=> [ ...crumbs, crumbs.slice(-1)[0] ? crumbs.slice(-1).join('/') + '/' + p : "/" + p ], [])
        breadcrumbs = steps.reduce(( crumbs, step )=>{ 

            let article = sitemap.find( s=> s.slug === step )
            if ( article ) {
                if ( article.sub ) sitemap = article.sub

                const { chapter, title } = article.meta
                crumbs = [ ...crumbs, { href: step, title, chapter } ] 
            }
            else crumbs = [ ...crumbs, { href: step, title: "Greška", chapter: 404 } ]

            return crumbs
        }, [] )
        
        last = breadcrumbs.pop()
        console.log( breadcrumbs )
    }
</script>

{#if breadcrumbs }
<ul id="breadcrumbs">
    <li>
        <a href="/" title="početna" >G.A.B.</a> <strong>/</strong>
    </li>
    {#each breadcrumbs as { href, title, chapter } }
        <li>
            <span>{ chapter }</span> <a { href } title={ href } >{ title }</a> <strong>/</strong>
        </li>
    {/each}
    <li>
        <span>{ last.chapter }</span>  { last.title } <strong>&nbsp;</strong>
    </li>
</ul>
{/if}