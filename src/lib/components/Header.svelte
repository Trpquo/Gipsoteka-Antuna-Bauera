<script>

    import { slide } from 'svelte/transition';
    import { cubicOut, backIn } from 'svelte/easing'

    import Navigation from '$lib/gadgets/Navigation.svelte'

    export let images, menu, slug
    let dropDown, menuOpen = false, button, y, oldY = 0, down = false



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

    function handleScroll() {
        if ( oldY < y ) { 
            down = true 
        }
        else down = false
        
        oldY = y
    }
    
</script>

<svelte:window on:click={ handleClick } bind:scrollY={ y } on:scroll={ handleScroll } />

<header id="pageHeader" class="moj">

    <h1>
        <a href="/"><span>G</span>ipsoteka <div><span>A</span>ntuna <span>B</span>auera</div></a>
        <button id="menuButton" on:click={ openMenu } class:active={ menuOpen } class:visible={ !down } bind:this={ button } ><span>Izbornik</span></button>
        
        {#if menuOpen }
        <nav id="menu" aria-label="Site navigation"
            bind:this={ dropDown }
            in:slide={{ duration: 1000, easing: cubicOut }} 
            out:slide={{ duration: 1500, easing: backIn }} 
        >
            <Navigation { menu } { slug } level=1 />
        </nav>
        {/if}
    </h1>
    
    {#if images }
        <div id="heroBg">
            {#each images as src }
            <figure>
                <img { src } alt="Gliptoteka Antuna Bauera" />
            </figure>
            {/each}
        </div>
    {/if}

</header>
