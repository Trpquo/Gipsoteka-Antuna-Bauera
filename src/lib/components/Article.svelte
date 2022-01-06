<script context="module">
    import { img, p } from '$lib/components/html/all'
    export { img, p }
</script>
<script>
    import { fly } from 'svelte/transition'

    export let title, chapter
    let article, content

</script>

<svelte:head>
    <title>Gipsoteka | { title }</title>
</svelte:head>

<article bind:this={ article } in:fly={{ x: 1000, delay: 300, duration: 1000 }} out:fly={{ x: -300, duration: 300 }} >
    {#if chapter }
    <h4 id="chapNo">{ chapter }</h4>
    {/if}
    <section class="textContent" bind:this={ content }>
        <slot />
    </section>

</article>
