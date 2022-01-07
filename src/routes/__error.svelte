<script context="module">
    export function load({ error, status }) {
        return {
            props: {
                error,
                status
            }
        }
    }
</script>
<script>
    import Article from '$lib/components/Article.svelte'

    export let status, error
</script>

<Article chapter={ 0 } title={ status } >
    <h1>Greška <strong>{ status }</strong> pri učitavanju!</h1>
    <h3>
        { error.message.substring( error.message.indexOf( "/" ) ) }
    </h3>

</Article>




<style>
    strong {
        color: var(--accent-color);
    }
</style>