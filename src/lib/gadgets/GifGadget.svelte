<script>
    import { tick } from 'svelte'
    export let src

    let canvas, w, h, visible = "freeze"

    function preload(src) {
        return new Promise(resolve=> {
            const img = new Image()
            img.onload = resolve
            img.src = src
            setTimeout( ()=>drawCanvas( img ), 1000 )
        })
    }
    
    function drawCanvas( img ) {
    
        h = img.height;
        w = img.width;
        
        if ( canvas && img && w && h ) {
            canvas.width = w
            canvas.height = h
            canvas.getContext('2d').drawImage(img, 0, 0, w, w);
        }
    }
    
    // style= `width: ${ w }px; height: ${ h }px`
</script>

{#await preload( src ) then _ }
<span class="animated-icon" on:mouseenter={()=> visible = 'gif' } on:mouseleave={()=> visible = 'freeze' } >
    <canvas class:hidden={ visible !== 'freeze' }  bind:this={ canvas }></canvas>
    <img { src } class:hidden={ visible !== 'gif' } alt="Animated icon" />
</span>
{/await}

<style>
    span {
        display: inline-block;
        position: relative;
        mix-blend-mode: darken;
        width: 100%;
    }
    canvas, img {
        display: block;
        width: 100%;
    }
    canvas {
        top: 0;
        left: 0;
        position: absolute;
        height: 100%;
    }
    .hidden {
        visibility: hidden;
    }
</style>
