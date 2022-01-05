<script context="module">
    import { createMenu } from '$lib/utils/menuHelper'

    export function load() {

        const posts = import.meta.globEager( "../**/*.md" );
        const menu = createMenu( posts )
        

        return {
            props: {
                menu
            }
        }
    }
</script>

<script>
    import Header from '$lib/components/Header.svelte';
    import '../app.css';

    export let menu

    console.log(menu)
</script>

<Header { menu } />

<main>
    <slot />
</main>

<footer>
    <p>
        Copyright 2022.
    </p>
</footer>