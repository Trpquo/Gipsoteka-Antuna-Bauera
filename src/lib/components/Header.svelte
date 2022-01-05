<script>
    import Navigation from '$lib/components/Navigation.svelte'

    export let menu
</script>
<header>
    <h1><a href="/">Gipsoteka Antuna Bauera</a></h1>

    <nav id="menu">
        <Navigation { menu } />
    </nav>
</header>

<style>
    h1 a {
        text-decoration: none;
        color: inherit;
    }
</style>