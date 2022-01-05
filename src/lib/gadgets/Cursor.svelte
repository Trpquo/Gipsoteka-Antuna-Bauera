<script>
	import { spring } from 'svelte/motion';

	let coords = spring({ x: 50, y: 50 }, { stiffness: 0.05, damping: 0.25 });
	let size = spring(10, { stiffness: 0.25, damping: 0.5 });

    
</script>
    
<svelte:window 
    on:mousemove={ e=> coords.set({ x: e.clientX, y: e.clientY }) }
    on:mousedown={ () => size.set(15) }
    on:mouseup={ () => size.set(10) }

/>

<svg style={`top: ${$coords.y}px; left: ${$coords.x}px;`}>
	<circle cx=20 cy=20 r={$size}/>
</svg>
<style>
	svg {
        position: fixed;
        z-index: -1;
		width: 40px;
		height: 40px;
        margin-top: -18px;
        margin-left: -19px;
	}
	circle {
        fill: #ff3e0066;
	}
    /* :global(html, a, a:hover) {
        cursor: none;
    } */


</style>