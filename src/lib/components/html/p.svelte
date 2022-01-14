<script>
    import { beforeUpdate } from 'svelte'
    import Img from '$lib/components/html/img.svelte'

    let p, showbox = [], gallery = false, gallerians
   
    function hasOnlyImg( el ) {

        // console.log( [ ...el.childNodes ].map( n=> [ n, n.nodeType, n.tagName ] ) )
        
        if ( [ ...el.children ].filter( ({ tagName }) => tagName === 'FIGURE' ).length === 0 ) {
            // console.log( el, "Samo tekst!" )
            return false
        } 
        else if ( [ ...el.childNodes ].every(n=> (n.tagName === 'FIGURE' || (n.nodeType === 3 && n.textContent.trim().length === 0) || n.nodeType === 8) )) {
            // console.log( el, "Samo slike!" )
            gallerians = el.children.length
            return true
        } else {
            // console.log( el, "Kombo!" )
            const images = el.querySelectorAll('img')
            showbox =  [ ...images ].map( ({ src, alt, title })=>({ src, alt, title }) )

            // console.log( figures, images, showbox )
            
            return false
        }
    }

    $: twist = showbox.length >  0
    
    beforeUpdate(async ( )=>{
        try {
            if ( p ) gallery = hasOnlyImg( p )
        }
        catch ( err ) {
            console.error
        }
    })


</script>



{#if gallery }
<aside class="gallery for{ gallerians }" >
    <h2>Galerija</h2>
    <slot />
</aside>
{:else}
<p bind:this={ p }>
    <slot />
    {#if showbox.length }
    <div class={ `showbox for${ showbox.length }` }>
        {#each showbox as img }
            <Img { ...img } { twist } />
        {/each}
    </div>
    {/if}
</p>
{/if}