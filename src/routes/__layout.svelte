<script context="module">
    import loader from '$lib/utils/server'

    export const load = ({ fetch } )=>{
        loader( fetch )

        return { props: {} }
    }

</script>
<script>

    import { Header, Footer, Loader } from '$lib/components/all'
    import '../app.css';
    import '../../node_modules/aos/dist/aos.css';
    
   

</script>

<Header />

<Loader />
<main>
    <slot />
</main>

<Footer />

<style>
    main {
        flex-grow: 1;
    }
</style>