<script>
    export let content, slug, title

    let prev, next, opened, scrollY, sticky, headerHeight, animate = "15s" // za titranje

    const slugs = content.map(s=> s.slug )
    const parent = '/' + slugs[0].split("/")[1]
    const chapter = '/' + slugs[0].substring(1, slugs[0].lastIndexOf('/') )
    // console.log( chapter )

    function handleScroll() {
        if ( !headerHeight ) headerHeight = document.querySelector('header').offsetHeight
        sticky = scrollY - headerHeight > 0
    }

    function handleClick({ target }) {
        const test = [ ...target.classList, ...target.parentNode.classList ].some(x=> [ "mini-content", "mini-button", "current" ].indexOf(x) >= 0 )
        if ( test ) {
            opened = true
            animate = false
        }
        else opened = false
    } 

    function updateUtils( active ) {
        const i = slugs.indexOf( active )
        prev = content[ Math.max( i - 1, 0 ) ].slug
        next = content[ Math.min( i + 1, content.length - 1 ) ].slug
    }

    $: updateUtils( slug )


    // console.log( content.menu )
</script>

<svelte:window 
    bind:scrollY={ scrollY }
    on:click={ handleClick } 
    on:scroll={ handleScroll }
/>

{#if Array.isArray( content ) }
<ul class="mini-content" class:opened class:sticky style={ `--animate: ${ animate }` } >
    <h2><a href={ chapter } >{ title }</a></h2>
    {#each content as { slug: cSlug, meta: { title: cTitle } }, i }
    <li>
        {#if cSlug !== slug }
        <a href={ cSlug } >{ cTitle }</a>
        {:else}
        <span class="current">{ cTitle }</span>
        {/if}
    </li>
    {/each}
    <li class="utils">
        <a href={ prev } title="Prethodno" alt="Prethodno" class="mini-button">◁</a> 
        <a href={ next } title="Iduće" alt="Iduće" class="mini-button">▷</a> 
        <button on:click={ ()=>history.back() } title="Natrag" class="mini-button">↩</button> 
        <a href={ parent } title={ parent } alt="Poglavlje">⩓</a> 
        <button title="Zatvori">⨉</button> 
    </li>
</ul>
{/if}