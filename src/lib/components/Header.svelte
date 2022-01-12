<script>

    import { slide } from 'svelte/transition';
    import { cubicOut, backIn } from 'svelte/easing'

    import { site } from '$lib/utils/stores'
    import Navigation from '$lib/gadgets/Navigation.svelte'

    let menu

    $: {
        if ( $site ) menu = $site.menu
    }

    let dropDown, menuOpen = false
    function openMenu( e ) {
        menuOpen = !menuOpen
    }
    function handleClick({ target }) {

        if ( !dropDown ) return
        // console.log( target.tagName, target.id )
        const menuItems = [ ...dropDown.querySelectorAll( '#menu *' ) ]

        if ( 
            ( target === dropDown || menuItems.includes( target ) )
            && 
            target.tagName !== 'BUTTON' 
        ) menuOpen = !menuOpen
    }


    
</script>
<header>
    <h1><a href="/"><span>G</span>ipsoteka <span>A</span>ntuna <span>B</span>auera</a></h1>

    <button id="menuButton" on:click={ openMenu } class:active={ menuOpen }>Izbornik</button>
    {#if menuOpen }
    <nav id="menu" 
        bind:this={ dropDown }
        in:slide={{ duration: 1000, easing: cubicOut }} 
        out:slide={{ duration: 1500, easing: backIn }} 
    >
        <Navigation { menu } />
    </nav>
    {/if}
</header>

<svelte:window on:click={ handleClick } />
