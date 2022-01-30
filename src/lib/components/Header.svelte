<script>
    import { onDestroy } from 'svelte'
    import { slide } from 'svelte/transition';
    import { cubicOut, backIn } from 'svelte/easing'

    import Navigation from '$lib/gadgets/Navigation.svelte'

    export let images, menu, slug
    let dropDown, menuOpen = false, y, oldY = 0, down = false



    function toggleMenu(t) {
        // console.log(`Recieving toggle request for ${ t.tagName + " " + t.title }.`)
        menuOpen = !menuOpen
    }
    function handleClick({ target }) {
        // console.log( !!dropDown, target.tagName, target.id, target.title )
        if ( target.id === 'menuButton' ) return toggleMenu()
        if ( !dropDown || target.title === slug ) return
        if ( target.tagName !== 'BUTTON' ) toggleMenu()
    }

    function handleScroll() {

        if ( oldY < y  ) {  // || y >= pageHeight // samo ne mogu dobiti točan pageHeight
            down = true 
        }
        else down = false
        oldY = y
    }

    onDestroy(()=>{
        dropDown = null
    })
    
</script>

<svelte:window on:click={ handleClick } bind:scrollY={ y } on:scroll={ handleScroll } />

<header id="pageHeader" class="moj">

    <h1>
        <a href="/"><span>G</span>ipsoteka <div><span>A</span>ntuna <span>B</span>auera</div></a>
        <button id="menuButton" class:active={ menuOpen } class:visible={ !down } title="Izbornik"><span>Izbornik</span></button>
        
        {#if menuOpen }
        <nav id="menu" aria-label="Site navigation"
            bind:this={ dropDown }
            in:slide={{ duration: 750, easing: cubicOut }} 
            out:slide={{ duration: 750, easing: backIn }} 
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

<style>
    #menuButton span {
        z-index: -1;
    }
</style>
