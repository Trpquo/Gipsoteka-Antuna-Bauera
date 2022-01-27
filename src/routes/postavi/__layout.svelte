<script context="module">
    export const load = ( { url: { pathname: slug } } ) => {

        console.log( "%cLoading post", "color: peru", slug )
        return { props: { slug } }
    }
</script>

<script>
    import { site } from '$lib/utils/stores'
    import ContentMini from '$lib/gadgets/ContentMini.svelte'

    export let slug
    let content, menu, path, title


    $: if ( slug ) path = slug.split('/').slice(1);

    $: if ( $site && !menu ) {
        menu = $site.menu
        console.log("%cReading $site.menu", "color: peru", slug )
    }
    
    $: if ( menu && path ) {

        if ( path.length > 1 ) {
            console.log( "path.length", path.length )
            let tempSite = [ ...menu ]
            let temptempSite
            if ( Array.isArray( tempSite ) ) {
                for ( const p of path ) {
                    tempSite = tempSite.find( s=> s.slug.indexOf( "/" + p ) >= 0 )
                    
                    if ( tempSite ) if ( tempSite.sub ) {
                        title = tempSite.meta.title
                        tempSite = tempSite.sub
                        temptempSite = [ ...tempSite ]
                    }
                    else break
                }
                content = temptempSite
                // console.log( "content", content )
            }        
            else content = false
        } else content = false
    }

    

</script>


<div class="post-w-minicontent">
    {#if Array.isArray( content ) }
        <ContentMini { content } { slug } { title } />
    {/if}
    <slot />
</div> 

<style>
    div {
        padding-top: 1px;
    }
</style>