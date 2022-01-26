<script>
    export let href, rel, target

</script>

<div>
    <slot name="gadget" />
    <a { rel } { target } { href } title="Preuzmi" >
        <slot name="link" />
    </a>
    {#if $$slots.gadget }
    <small>Otvori preko ikone &mdash; preuzmi preko poveznice</small>
    {/if}
</div>


<style>
    div {
        
        /* border: 1px solid var(--accent-color); */
        text-shadow: none;
        float: left;
        width: calc( 100% - var(--large-padding) );
    }
    a {
        font-family: var(--text-face);
        font-variant: normal;
        display: flex;
        height: 4rem;
        align-items: center;
        line-height: 1rem;
        margin-top: clamp( -1rem, 100vw - 100vh, 0rem );
    }
    small {
        display: block;
        font-family: var(--text-face);
        text-transform: uppercase;
        color: var(--bg-dark);
        margin-top: clamp( -1.666rem, calc( -1.666rem + (100vh - 100vw) * .072 ), 1rem );
        
        /* margin-top: -1.55rem; */
    }
    :global(span[slot=gadget] + a) {
        /* color: teal; */
    }

</style>