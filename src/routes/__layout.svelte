<script context="module">
    import loader from '$lib/utils/server'
    
    
    export const load = ({ fetch, url: { pathname: slug } } )=>{
        const getSite = ()=>loader( fetch )
        
        console.log( "%cLoading route", "color: darkseagreen", slug )
        return { props: { slug, getSite } }
    }
    
</script>
<script>

    import { Header, Footer, Loader } from '$lib/components/all'
    import { site } from '$lib/utils/stores'
    import '../app.css';
    // import '../../node_modules/aos/dist/aos.css';
    
    export let getSite, slug
    let relevantImages, menu
    const numRelevantImages = 10


    $: if ( $site && !menu ) {
        menu = $site.menu
        console.log("%cSetting $site.menu", "color: darkseagreen")
    }
    $: if ( menu ) {
        console.log( "%cSetting relevantImages", "color: darkseagreen" )
        const imageSet = new Set( $site.images.filter( im=> im.indexOf( '/img/' ) >= 0 ).map( im => im.substring( im.indexOf('/img/') )) ) 
        relevantImages = selectRandomImage( [ ...imageSet ].filter( im=> im.indexOf( slug ) >= 0 ), numRelevantImages, [ ...imageSet ] )
    }
    
    
    function selectRandomImage( arr, num ,images ) {

        const { floor, random } = Math
        const selected = new Set()
        
        if ( arr.length < 4 ) {
            arr = images.filter( im=> im.indexOf( '/postavi/' ) >= 0 )
            // console.log(`Too little images for ${ slug }`, arr)
        }

        if ( arr.length < num / 2 ) num = 2
        else if ( arr.length < num ) num = arr.length

        let i;
        for ( i = 0; selected.size < num && i < num * 2; i++ ) {
            const randImg = arr[ floor( random( ) * arr.length ) ]
            selected.add( randImg )
        }
        // console.log( i, num, selected.size, arr.length, arr )

        return [ ...selected ]
    }

</script>

<svelte:window on:load|once={ getSite } />

<Header images={ relevantImages } { menu } { slug } />

<Loader />
<main>
    <slot />
</main>

<Footer />

<style>
    main {
        flex-grow: 1;
    }
</style>