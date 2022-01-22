<script>
	import { spring } from 'svelte/motion';
	import { onMount } from 'svelte';

    export let x, y

    let self

    
    
    
    
	let coords = spring({ x, y }, { stiffness: 0.05, damping: 0.25 });
	let size = spring(30, { stiffness: 0.2, damping: 0.2 });

    onMount(()=>{

        return ()=>{
            console.log("%c 💥 D E S T R U C T I O N ! 💥", "color: orangered; font-weight: 800;")
            window.removeEventListener("mousemove", dispatchLocation)
            window.removeEventListener("mousedown", reactToPress)
            window.removeEventListener("mouseup", reactToRelease)
        }
    })


    const dispatchLocation =e=> { coords.set({ x: e.clientX - self.parentNode.getBoundingClientRect().left, y: e.clientY - self.parentNode.getBoundingClientRect().top }) }
    const reactToPress =e=> { size.set(200) }
    const reactToRelease =e=> { size.set(40) }

    const toggleLightbox =e=> {
        self.parentNode.parentNode.classList.contains( "lightboxtime" ) ?
          self.parentNode.parentNode.classList.remove( "lightboxtime" ) :
             self.parentNode.parentNode.classList.add( "lightboxtime" ) ;
    } 

</script>
    
<svelte:window 
    on:mousemove={ dispatchLocation }
    on:mousedown={ reactToPress  }
    on:mouseup={ reactToRelease }
/>

<svg style={`top: ${$coords.y}px; left: ${$coords.x}px;`} bind:this={ self } 
    on:click={ toggleLightbox }
    >
	<circle cx=400 cy=400 r={$size}/>
</svg>


<style>
	svg {
        position: absolute;
        z-index: 100000;
		width: 800px;
		height: 800px;
        margin-top: -402px;
        margin-left: -405px;
	}
	circle {
        fill: var(--bg-color-light);
        opacity: .666;
	}


</style>