<script context="module">
    import { createMenu } from '$lib/utils/menuHelper'

    export function load() {

        const posts = import.meta.globEager( "../**/*.md" );
        // const images = import.meta.glob( "../**/*.jpg" );
        const site = createMenu( posts )
        
        return {
            props: {
                site,
                // images
            }
        }
    }
</script>

<script>
    import Header from '$lib/components/Header.svelte'
    import Footer from '$lib/components/Footer.svelte'
    import '../app.css';
    
    export let site //, images
    
    // console.log( images )
    // console.log( site )

</script>

<Header menu={ site } />

<main>
    <slot />
</main>

<Footer />

<style>
    main {
        flex-grow: 1;
    }
</style>