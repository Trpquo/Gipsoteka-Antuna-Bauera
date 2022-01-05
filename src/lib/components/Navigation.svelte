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

<style>
    ul {
        display: flex;
        padding: 0;
    }

    li {
        list-style: none;
        position: relative;
        margin-right: .2rem;
    }
    li a {
        display: block;
        box-sizing: border-box;
        padding: .5rem;
        width: 100%;
        height: 100%;
        text-decoration: none;
        background-color: var(--accent-color2);
        color: var(--text-dark);
    }
    li a:hover {
        background-color: var(--accent-color);
    }
    li a.active {
        background-color: var(--accent-color);
    }
</style>