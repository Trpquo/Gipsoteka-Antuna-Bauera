<script context="module">
    import { img, p } from '$lib/components/html/all'
    export { img, p }
</script>

<script>
    import { onMount, tick } from 'svelte'
    import { fly } from 'svelte/transition'

    import Breadcrumbs from "$lib/gadgets/Breadcrumbs.svelte"

    // import AOS from 'aos'

    export let title, chapter, coverImage, imgRoot
    let coverImageUrl, scrollY, innerHeight, article, imageTransfer, opacity, vignetteAngle
    
    if (chapter) chapter = chapter.toString()
    
    onMount(async ()=>{
        
        if ( article ) {
            await tick()

            const images = article.querySelectorAll('img')
            if ( images.length ) {
                if ( coverImage ) {
                    coverImageUrl = [ ...images].find( im=> im.src.indexOf( "/" + coverImage.substring(0, coverImage.indexOf(".")) ) > 0 ).src
                    // console.log( "Predefined cover image!", "/" + coverImage.substring(0, coverImage.indexOf(".")) , coverImageUrl )
                }
                else {
                    coverImageUrl = images[ Math.floor(Math.random()*images.length) ].src
                    // console.log( "Predefined cover image!", coverImageUrl )
                }

                // tu kreće kod za fancy galeriju

            }
        }
    })


    $: if ( article ) {
        imageTransfer =  innerHeight - ( 350 + scrollY ) * ( innerHeight / article.clientHeight )
        opacity = 0.025 + scrollY * .1 / article.clientHeight
        vignetteAngle = 180 - ( innerHeight * 10 / article.clientWidth )
    }


</script>

<svelte:head>
    {#if title}
    <title>Gipsoteka | { title }</title>
    {:else}
    <title>Gipsoteka Antuna Bauera</title>
    {/if}
</svelte:head>
<svelte:window bind:scrollY bind:innerHeight />

<article in:fly={{ x: 1000, delay: 300, duration: 1000 }} out:fly={{ x: -300, duration: 300 }} bind:this={ article } >
    {#if chapter }
        <h6 id="chapNo">
            {#if chapter.indexOf(".") > 0 }
                { chapter.substring(0, chapter.indexOf(".")) }
                <span>{chapter.substring(chapter.indexOf("."), chapter.length)}</span>
            {:else}
                { chapter }
            {/if}
        </h6>
    {/if}

    <section class="textContent" >

        <h1>{@html title }</h1>

        {#if imgRoot }
            <Breadcrumbs path={ imgRoot } />
        {/if}

        <slot />

    </section>

    {#if coverImageUrl } 
        <div id="bgImage" 
            style={`
                --background-image: url('${ coverImageUrl }'); 
                --vignette-angle: ${ vignetteAngle }deg; 
                top: ${ imageTransfer }px; 
                --opacity: ${ opacity }
            `} 
        >
            <!-- Document height: { article.clientHeight } | Scrolled by: { scrollY } | Image transfered: { imageTransfer } | Vignette angle: { 180 - ( innerHeight * 10 / article.clientWidth ) }deg | Opacity: { opacity } -->
        </div>
    {/if}
    

</article>

<!-- <style>
    #bgImage {
        display: grid;
        place-content: top center;
        border: 3px solid magenta;
        color: magenta;
        opacity: 1;
        filter: none;
        text-align: center;
        mix-blend-mode: normal;
        z-index: 20000;
    }
</style> -->