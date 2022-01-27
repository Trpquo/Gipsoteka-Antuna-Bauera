<script context="module">
        let active = "foo"
        let noNewSubmenu = true
</script>
<script>
    import { fly, slide } from 'svelte/transition'

    export let menu, slug, level

    let openedSubmenu = "bar"
    let speed = 200

    $: if ( active === "foo" ) active = slug
    
    function toggleSubmenu( item ) {
        // target.removeEventListener( "mouseover", openIfHold )
        if ( openedSubmenu === item.slug ) {
            openedSubmenu = "" 
        } 
        else {
            openedSubmenu = item.slug
        }
        noNewSubmenu = false
        // setTimeout(()=>{
        //     target.addEventListener( "mouseover",  ()=>openIfHold( { target }, { slug } ) )
        // }, 5000)
    }

    function selectItem( el, item ) {
        if ( el.tagName !== 'BUTTON' ) {
            active = item.slug
            noNewSubmenu = true
        }
    }


</script>

<ul id="top" in:slide={{ duration: 500 }} out:slide={{ delay: (menu.length - level) * speed }}>

{#if menu }
{#each menu as item, i }
    {#if !!item.slug && !!item.meta.title }

    <li class:active={ slug.indexOf( item.slug ) >= 0 } class:current={ slug === item.slug } class:opened={ openedSubmenu === item.slug }>
        <a href="{ item.slug }" title={ item.slug }
            on:click={ ({ target  })=>selectItem( target, item ) } 
            in:fly={{ y: 20, duration: 500, delay: speed + speed * i }}
            out:fly={{ y: 20, duration: 500, delay: menu.length * speed - speed * ( menu.length - i ) }}
        >
            { item.meta.title }
            {#if item.sub }
            <button on:click|preventDefault={ ()=>toggleSubmenu( item ) } on:focus={()=>{}} class:submenuOpen={ openedSubmenu === item.slug || ( slug.indexOf( item.slug ) >= 0 && noNewSubmenu )} >&mdash;&gt;</button>
            {/if}
        </a>
        {#if item.sub  && // nulta provjera ima li uopće podmeni
            ( 
                ( ( active.indexOf( item.slug ) >= 0 ) && noNewSubmenu )// ako se za prvo otvaranje u njemu nalazi aktivna stranica
                ||
                ( openedSubmenu === item.slug && !noNewSubmenu ) // ako je upravo kliknut
            ) 
        } 
            <svelte:self  menu={ item.sub } { slug } level={ level + 1 } />
        {/if}
    </li>  

    {/if} 
{/each}
{/if}

</ul>