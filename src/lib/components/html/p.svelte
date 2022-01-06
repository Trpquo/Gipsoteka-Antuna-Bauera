<script>
    import { onMount } from 'svelte'

    let p, gallery = false

    function hasOnlyImg( el ) {
        if ( el.children.length === 0 ) return false
        return [ ...el.children ].every( ({ tagName }) => tagName === "FIGURE" )
    }

    onMount(async ( )=>{
        try {
            if ( p ) gallery = hasOnlyImg( p )
        }
        catch ( err ) {
            console.error( err )
        }
    })
</script>



{#if gallery }
<aside class="gallery">
    <slot />
</aside>
{:else}
<p bind:this={ p }>
    <slot />
</p>
{/if}