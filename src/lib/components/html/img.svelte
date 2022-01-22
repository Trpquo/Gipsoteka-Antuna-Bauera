<script>
    import { onMount } from 'svelte';
    import Cursor from '$lib/gadgets/Cursor.svelte'
    import { imageRoot } from '$lib/utils/stores'
    
    export let twist
    const acuteness = 3
    const angle =  Math.random() * acuteness - acuteness / 2
    let style, figure, hover
    

    onMount(()=>{

        if ( figure ) {
            setTimeout(()=>{
                if ( figure ) style = twist ? `transition: transform ${ r() + 1000 }s; transform: rotate(${ angle }deg)` : ""
            }, 20000)
        }
        
    })
    


    const aosAnimations = [
        "fade-up",
        "fade-up-right",
        "fade-up-left",
        "zoom-in-up",
        "zoom-out",
        "zoom-out-up",
        "zoom-out-down",
    ]

    const { floor, random: r } = Math

    const setCursor =e=> hover = { x: e.clientX - e.target.parentNode.getBoundingClientRect().left, y: e.clientY - e.target.parentNode.getBoundingClientRect().top  }
    
</script>

<figure { style } bind:this={ figure }
    data-aos={ twist && (r() -.5 ) > 0 ? aosAnimations[ floor( r() * aosAnimations.length ) ] : "" } 
    data-aos-delay={ r() * 500 } data-aos-duration={ r() * 500 + 1000 } data-aos-offset={ r() * 20 }
    >
    <div on:mouseover={ setCursor } on:focus={ ()=>{} } on:mouseleave={ ()=>hover = false }>
        <img src={ `${$imageRoot}/${$$props.src}` } title={ $$props.title } alt={ $$props.alt }  >
        {#if hover  }
         <Cursor { ...hover }  />
        {/if}
    </div>
    <figcaption><span class="short">{ $$props.title }</span><span class="long">{ $$props.alt }</span></figcaption>
</figure>
