<script context="module">
    let active = 0
</script>
<script>
    import { fly, slide } from 'svelte/transition'

    export let menu


    let submenuOpen = false, speed = 200
    function openSubmenu( e ) {
        submenuOpen = !submenuOpen
        // console.log( submenuOpen, active )
    }
    function selectItem( el, slug ) {
        if ( el.tagName !== 'BUTTON' ) {
            active = slug
        }
    }

</script>

<ul id="first" in:slide={{ duration: 1000 }} out:slide={{ delay: menu.length * speed }}>
{#if menu }
    {#each menu as item, i }
    {#if !!item.slug && !!item.meta.title }
    <li class:active={ !!active ? active.indexOf( item.slug ) + 1 : 0 }
        >
        <a href="{ item.slug }" 
            on:click={ ({ target  })=>selectItem( target, item.slug ) } 
            in:fly={{ y: 20, duration: 500, delay: speed + speed * i }}
            out:fly={{ y: 20, duration: 500, delay: menu.length * speed - speed * ( menu.length - i ) }}
        >
            { item.meta.title }
            {#if !!item.sub }
            <button on:click|preventDefault={ openSubmenu } class:submenuOpen >open</button>
            {/if}
        </a>
        {#if !!item.sub && ( submenuOpen || [ item.slug, ...item.sub.map( i=>i.slug ) ].includes( active ) ) } 
            <svelte:self  menu={ item.sub } />
        {/if}
    </li>  
    {/if} 
    {/each}
{/if}
</ul>