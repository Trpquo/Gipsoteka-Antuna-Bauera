<script context="module">
    import { img, p } from '$lib/components/html/all'
    export { img, p }
</script>
<script>
    import { onMount, tick } from 'svelte'

    import { fly } from 'svelte/transition'
    import AOS from 'aos'

    export let title, chapter, coverImage
    
    let coverImageUrl, scrollY, innerHeight, article, client = {}
    

    
    onMount(async ()=>{
        
        if ( article ) {
            await tick()
            client.height = article.clientHeight 
            client.width = article.clientWidth 

            const images = article.querySelectorAll('img')
            if ( coverImage ) {
                coverImageUrl = [ ...images].find( im=> im.src.indexOf( "/" + coverImage.substring(0, coverImage.indexOf(".")) ) > 0 ).src
                // console.log( "Predefined cover image!", "/" + coverImage.substring(0, coverImage.indexOf(".")) , coverImageUrl )
            }
            else {
                coverImageUrl = images[ Math.floor(Math.random()*images.length) ].src
                // console.log( "Predefined cover image!", coverImageUrl )
            }
        }

        AOS.init( { easing: 'ease-in-out-sine', once: true, mirror: false, duration: 1500, offset: 20 } )

    })


    $: imageTransfer =  innerHeight - (1 - ( client.height - scrollY ) / client.height ) * innerHeight - ( client.width / client.height ) * (client.height - scrollY) / 4 
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
    <h4 id="chapNo">{ chapter }</h4>
    {/if}
    <section class="textContent" >
        <slot />
    </section>
    {#if coverImageUrl } 
        <div id="bgImage" style={ `--background-image: url('${ coverImageUrl }'); --vignette-angle: ${ 160 + ( client.height * 4 / client.width ) }deg; top: ${ imageTransfer }px; --opacity: ${ innerHeight * 0.5 / imageTransfer  }` } ></div>
    {/if}
    <!--  -->
</article>
