<script>
    import { onMount } from 'svelte'
    import { blur } from 'svelte/transition'

    let hideInitialContent = true

    onMount(()=>{
        setTimeout(()=>{ hideInitialContent = false }, 1500)    
    })

</script>


{#if hideInitialContent}
    <div out:blur={{ duration: 1666 }}>
        <div id="spinner"><span>G</span></div>
    </div>
{/if}

<style>
    div {
        position: fixed;
        inset: 0;
        background-color: var(--bg-light);
        z-index: 20000;
    }
    #spinner {
        --spin-dims: clamp(80px, 12vmax, 120px);
        --spin-stroke: clamp(5px, .8vmax, 7px);
        position: absolute;
        inset: 0;
        width: var(--spin-dims);
        height: var(--spin-dims);
        margin: auto;
        border: var(--spin-stroke) solid var(--bg-dark);
        border-right: var(--spin-stroke) solid var(--accent-color);
        border-radius: 50%;
        animation: spin 1.666s linear infinite;
    }
    
    span {
        display: block;
        text-align: center;
        padding-top: .05em;
        font-family: var(--text-face2);
        font-size: calc( var(--spin-dims) * .666 );
        font-weight: 500;
        line-height: var(--spin-dims);
        color: var(--accent-color);
        opacity: .83;
    }

    @keyframes spin {
        from { transform: rotate(0deg) }
        to { transform: rotate(360deg) }
    }
</style>