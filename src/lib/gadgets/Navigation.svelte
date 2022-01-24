<script context="module">
        let active = "foo"
</script>
<script>
    import { fly, slide } from 'svelte/transition'

    export let menu, level = 1

    let openedSubmenu = "bar", noNewSubmenu = true


    let speed = 200
    
    function toggleSubmenu( { target }, { slug } ) {
        // target.removeEventListener( "mouseover", openIfHold )
        openedSubmenu === slug ? openedSubmenu = "" : openedSubmenu = slug
        noNewSubmenu = false
        // setTimeout(()=>{
        //     target.addEventListener( "mouseover",  ()=>openIfHold( { target }, { slug } ) )
        // }, 5000)
    }

    function selectItem( el, item ) {
        if ( el.tagName !== 'BUTTON' ) {
            active = item.slug
        }
    }


</script>

<ul id="first" in:slide={{ duration: 500 }} out:slide={{ delay: (menu.length - level) * speed }}>
{#if menu }
{#each menu as item, i }
    {#if !!item.slug && !!item.meta.title }

    <li class:active={ active.indexOf( item.slug ) >= 0 } class:current={ active === item.slug } >
        <a href="{ item.slug }" 
            on:click={ ({ target  })=>selectItem( target, item ) } 
            in:fly={{ y: 20, duration: 500, delay: speed + speed * i }}
            out:fly={{ y: 20, duration: 500, delay: menu.length * speed - speed * ( menu.length - i ) }}
        >
            { item.meta.title }
            {#if item.sub }
            <button on:click|preventDefault={ e=>toggleSubmenu( e, item ) } on:focus={()=>{}} class:submenuOpen={ openedSubmenu === item.slug } >open</button>
            {/if}
        </a>
        {#if item.sub  && 
            ( 
                openedSubmenu === item.slug || 
                ( [ item.slug, ...item.sub.map(i=> i.slug) ].includes( active ) && noNewSubmenu )
            ) 
        } 
            <svelte:self  menu={ item.sub } level={ level + 1 } />
        {/if}
    </li>  

    {/if} 
{/each}
{/if}
</ul>