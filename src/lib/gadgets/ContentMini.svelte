<script>
    export let content, slug

    // console.log( content.menu )
</script>

{#if Array.isArray( content ) }
<ul class="mini-content" style={ `--fit-chapters: ${ 95 / content.length }%` }>
    <h2>Poveznice</h2>
    {#each content as { slug: cSlug, meta: { title } } }
    <li>
        {#if cSlug !== slug }
        <a href={ cSlug } >{ title }</a>
        {:else}
        <span class="active">{ title }</span>
        {/if}
    </li>
    {/each}
</ul>
{/if}