<script context="module">
    let active
</script>
<script>
    export let menu

    active = 0

</script>

    <ul id="first">
    {#if menu }
        {#each menu as item, i }
        {#if !!item.slug && !!item.meta.title }
        <li>
            <a href="{ item.slug }" on:click={ ()=> active = item.slug }  class:active={ !!active ? active.indexOf( item.slug ) + 1 : 0 }>
                { item.meta.title }
            </a>
            {#if !!item.sub } 
                <svelte:self  menu={ item.sub } />
            {/if}
        </li>  
        {/if} 
        {/each}
    {/if}
    </ul>
