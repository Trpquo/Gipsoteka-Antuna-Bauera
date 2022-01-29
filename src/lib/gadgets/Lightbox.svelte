<script>
    import { onMount, createEventDispatcher } from 'svelte'
    import { scale, blur } from 'svelte/transition'
    // import randomize from './lightboxRandomiser'

    export let images, focused
    let lightbox, active, pictures, index, description

    const dispatch = createEventDispatcher()
    
    

    onMount(()=>{
        if ( lightbox ) {
            pictures = [ ...lightbox.querySelectorAll('picture') ]
            const angle = Math.round( 36 / pictures.length ) * 10

            focused = pictures.find( p=> p.querySelector('img').src === focused )
            console.log( focused )
            if ( !focused ) {
                focused = pictures[ Math.floor( Math.random() * pictures.length ) ]
                focused.classList.add( "focused" )
            }
            if ( focused ) {
                description = focused.querySelector('img').alt
                index = pictures.indexOf( focused )
                focused.classList.add("focused")
            }

            pictures.forEach(( p, i )=> { 
                p.classList.add( `spread-out-by-${ angle * ( i + 1 ) }` ) 
                if ( p !== focused ) p.style.transitionDelay = `${ Math.random() * pictures.length * .35 }s` 
                stack( p, p === focused )
            })

            setTimeout(()=>{ active = true }, 100 )
            setTimeout(()=>{ pictures.forEach(p=> { p.style.transitionDelay = "0s"; p.style.transitionDuration = "0.75s" } ) }, 5000 )
        }
    })

    const stack = ( el, focused ) => setTimeout(( )=>{ el.style.zIndex = focused ? 2 : 1 }, focused ? 0 : 500 )

    function showcaseImage( target ) {
        pictures.forEach(p=> { p.classList.remove( "focused" ); stack( p, p === target ) })
        target.classList.add( "focused" )
        description = target.querySelector('img').alt
        index = pictures.indexOf( target )
    }

    const loop =i=> i % pictures.length

    

</script>

<svelte:window on:keypress={({ key, which })=>{ console.log( key, key == "Escape" || which == 27 ) }} />


<section id="lightbox" aria-hidden="true" bind:this={ lightbox } class:active in:scale={{ duration: 666 }} out:blur={{ duration: 1000 }} >
    <!-- {@html randomize( images ) } -->

    {#each images as { src, alt, title } }

    <picture on:click={ ({ target })=>showcaseImage( target ) }>
        <img { src } { alt } { title } />
    </picture>
    
    {/each}

    <div class="description">
        <p>{ description } </p>
        <div class="numerator">
            <span class="lightbox-image-ordinal">{ index + 1 }</span>
            <span class="lightbox-image-count" >{ images.length }</span>
        </div>
        <div class="controls">
            <button class="prev" on:click={()=> showcaseImage( pictures.at( loop( index-=1 )  ) )} >Prethodna</button>
            <button class="next" on:click={()=> showcaseImage( pictures.at( loop( index+=1 )  ) )}>Iduća</button>
            <button class="exit" on:click={()=> dispatch('lightsoff') }>Izlaz</button>
        </div>
    </div>
</section>