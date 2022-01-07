<script context="module">
    import createMenu from '$lib/utils/menuHelper'

    export async function load() {

        
        // const images = import.meta.glob( "../**/*.jpg" );
        const menu = await createMenu()        

        return {
            props: {
                menu,
                // images
            }
        }
    }
</script>

<script>
    import Header from '$lib/components/Header.svelte'
    import Footer from '$lib/components/Footer.svelte'
    import '../app.css';
    
    export let menu
    // console.log( images )
    // console.log( site )

</script>

<Header { menu } />

<main>
    <slot />
</main>

<Footer />

<style>
    main {
        flex-grow: 1;
    }
</style>