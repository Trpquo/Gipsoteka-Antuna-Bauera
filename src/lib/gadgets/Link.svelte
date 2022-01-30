<script>
    export let href, rel, target

</script>

<div class="gadget-link">
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
        /* float: left; */
        width: calc( 100% - var(--large-padding) );
        margin-bottom: 2rem;
        margin-top: var(--large-padding);
    }
    @media (max-width: 800px) {
        div {
            width: 100%;
        }
    }
    :global( .gadget-link + .gadget-link ) {
        margin-top: -1rem;
    }
    a {
        font-family: var(--text-face);
        font-variant: normal;
        display: flex;
        height: 4rem;
        align-items: center;
        line-height: 1rem;
        margin-top: clamp( -.5rem, 100vw - 100vh, -.35rem );
    }
    /* @media ( max-width: 800px ) {
        a {
            display: block;
        }
    } */
    small {
        display: block;
        font-family: var(--text-face);
        text-transform: uppercase;
        color: var(--bg-dark);
        margin-top: clamp( -1.1rem, -1.5rem + (100vh - 100vw) * .05, 1.1rem );
        line-height: 1.1em;
        font-size: .666rem;
        font-weight: 500;

        /* margin-top: -1.55rem; */
    }

</style>