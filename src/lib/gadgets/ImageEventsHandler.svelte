<script>
	import { spring } from 'svelte/motion';
	import { onMount } from 'svelte';

    
    export let x, y
    
    let self, figure
    
    
    
	let coords = spring({ x, y }, { stiffness: 0.05, damping: 0.25 });
	let size = spring(30, { stiffness: 0.2, damping: 0.2 });

    onMount(()=>{

        if ( self ) {
            figure = [ self.parentNode, self.parentNode.parentNode, self.parentNode.parentNode.parentNode ].find(p=> p.tagName === "FIGURE" )
            setTimeout(()=> { if ( self ) figure.classList.add( "hovered" ) }, 2000)

            
            // console.log( figure )
        }

        return ()=>{
            // console.log("%c 💥 D E S T R U C T I O N ! 💥", "color: orangered; font-weight: 800;")
            figure.classList.remove( "hovered" )
            window.removeEventListener("mousemove", dispatchLocation)
            window.removeEventListener("mousedown", reactToPress)
            window.removeEventListener("mouseup", reactToRelease)
        }
    })


    const dispatchLocation = async e=> { 
        coords.set({ 
            x: e.clientX - figure.getBoundingClientRect().left, 
            y: e.clientY - figure.getBoundingClientRect().top 
        })
    }
    const reactToPress =e=> { size.set(200) }
    const reactToRelease =e=> { size.set(40) }

    const toggleLightbox =e=> {
        figure.classList.add( "focused" )
        figure.dispatchEvent(new CustomEvent('lightboxtime', { bubbles: true, detail: { focus: figure.querySelector('img').src } }))
    } 

    function disableContextmenu(e) {
        e.preventDefault()
        return false
    } 
    

</script>
    
<svelte:window 
    on:mousemove={ dispatchLocation }
    on:mousedown={ reactToPress  }
    on:mouseup={ reactToRelease }
/>

<svg style={`top: ${$coords.y}px; left: ${$coords.x}px;`} bind:this={ self } 
    on:click={ toggleLightbox }
    on:contextmenu={ disableContextmenu }
    >
	<circle cx=400 cy=400 r={$size}/>
</svg>


<style>
	svg {
        position: absolute;
        z-index: 10;
		width: 800px;
		height: 800px;
        margin-top: -402px;
        margin-left: -405px;
	}
	circle {
        fill: var(--primary-color);
        opacity: .666;
	}


</style>