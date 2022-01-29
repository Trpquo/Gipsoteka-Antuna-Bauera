<script>
    import { onDestroy, createEventDispatcher } from 'svelte'
    import { imageRoot } from '$lib/utils/stores'
    import EventHandler from '$lib/gadgets/ImageEventsHandler.svelte'

    let hovered, scrollY, scrollX, oldY, oldX
    const dispatch = createEventDispatcher()
    

    const cursorTracker = setInterval(()=>{ oldY = scrollY; oldX = scrollX }, 100 )


    
    const setEventHandler =({ clientX, clientY, target })=> {
        hovered = { 
            x: clientX - target.getBoundingClientRect().left, 
            y: clientY - target.getBoundingClientRect().top  }
    }

    onDestroy(()=>{
        clearInterval( cursorTracker )
    })

    function openLightbox({ detail: { rect } }) {
		console.log( rect.x + rect.width === rect.right )
        dispatch('lightson')
	}
    
</script>

<svelte:window bind:scrollY bind:scrollX />

<figure>
    <div on:mouseenter={ setEventHandler } on:mouseleave={ ()=>hovered = false }>
        <img src={ `${$imageRoot}/${$$props.src}` } title={ $$props.title } alt={ $$props.alt }  >
        {#if hovered  }
         <EventHandler { ...hovered } on:lightboxtime={ openLightbox } />
        {/if}
    </div>
    <figcaption>
        <span class="short">{ $$props.title }</span>
        <span class="long">{ $$props.alt }</span>
    </figcaption>
</figure>
