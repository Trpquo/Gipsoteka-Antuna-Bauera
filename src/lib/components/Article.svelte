<script>
    import { onMount } from 'svelte'

    export let title, chapter, article

    function hasOnlyImg( el ) {
        if (el.children.length != 1)
            return false;
        return el.children[0].tagName === "IMG";
    }

    function unwrapImg( el ) {
        if ( el.children[0].tagName === 'IMG' ) {
            const img = el.children[0]
            // el.remove()
            return img 
        }
    }

    let images

    onMount(( )=>{

        try {
            images = [ ...article.querySelectorAll('p') ]
                                .filter( hasOnlyImg )
                                .map( unwrapImg )
            console.log( images  )
        }
        catch ( error ) {
            console.error( error.message )
        }
    })
</script>

<svelte:head>
    <title>Gipsoteka | { title }</title>
</svelte:head>

<article bind:this={ article }>
    <h4 id="chapNo">{ chapter }</h4>
    <slot />

    <section class="gallery">
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
    </section>
</article>


<style>
    h4 {
        font-size: 6rem;
        line-height: 4rem;
        margin: .15rem;
        color: var(--accent-color);
    }

    .gallery {
        display: flex;
    }
    img {
        max-width: 100%;
        display: block;
        pointer-events: none;
    }
    figure {
        margin: 0;
    }
    figcaption {
        padding: 1rem;
        background-color: var(--accent-color);
        color: var(--text-light);
    }
    @media ( min-width: 800px ) {
        .gallery figure {
            width: 300px;
            max-width: 30%;
            overflow: hidden;
        }
        .gallery figure img {
            width: 100%;
        }

    }
</style>