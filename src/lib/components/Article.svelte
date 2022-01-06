<script>
    import { onMount } from 'svelte'
    import { fade, fly } from 'svelte/transition'

    export let title, chapter, article

    function hasOnlyImg( el ) {
        if ( el.children.length === 0 ) return false
        const answ = [ ...el.children ].every( ({ tagName }) => { console.log( tagName ); return tagName === "FIGURE" } )
        console.log( answ )
        return answ
        
    }

    let hasImages = false
    onMount(( )=>{
        try {
            const aside = article.querySelector('aside')
            if ( !aside ) return
            article.querySelectorAll('p').forEach( p=>  {
                 if ( hasOnlyImg( p ) ) {
                    [ ...p.children ].forEach(f=> aside.appendChild(f) )
                    hasImages = true
                 }
            } )

        }
        catch ( err ) {
            console.error( err )
        }
    })
</script>

<svelte:head>
    <title>Gipsoteka | { title }</title>
</svelte:head>

<article bind:this={ article } in:fly={{ x: 1000, delay: 300, duration: 1000 }} out:fly={{ x: -300, duration: 300 }} >
    <h4 id="chapNo">{ chapter }</h4>
    <section class="textContent">
        <slot />
    </section>
    <aside class:gallery={ hasImages } ></aside>

    <!-- <section class="gallery">
        {#if images }
        {#each images as { src, alt, title } (title)}
            <figure>
                <img { src } { alt } { title } >
                <figcaption>
                    { alt }
                </figcaption>
            </figure>
        {/each}
        {/if }
    </section> -->
</article>


<style>
    h4 {
        font-size: 6rem;
        line-height: 4rem;
        margin: .15rem;
        color: var(--accent-color);
    }
</style>