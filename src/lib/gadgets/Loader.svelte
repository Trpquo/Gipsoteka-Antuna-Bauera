<script>
    import { onMount } from 'svelte'
    import { blur } from 'svelte/transition'

    let hideInitialContent = true

    onMount(()=>{
        setTimeout(()=>{ hideInitialContent = false }, 500)    
    })

</script>


{#if hideInitialContent}
    <div  transition:blur={{ duration: 666 }}>
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
        border-right: var(--spin-stroke) solid var(--bg-color-light);
        border-radius: 50%;
        animation: spin 1.666s linear infinite;
    }
    
    span {
        display: block;
        text-align: center;
        padding-top: .05em;
        font-family: var(--head-face);
        font-size: calc( var(--spin-dims) * .666 );
        font-weight: 500;
        line-height: var(--spin-dims);
        color: var(--bg-color-light);
        opacity: 0;
        filter: blur(4px);
        animation: blurIn 1s forwards;
    }

    @keyframes spin {
        from { transform: rotate(0deg) }
        to { transform: rotate(360deg) }
    }
    @keyframes blurIn {
        50% { filter: blur(4px); opacity: 0; }
        100% { filter: blur(0); opacity: .83; }
    }
</style>