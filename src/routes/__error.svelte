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
    export let status;
    export let error;
</script>

<h1>Greška <strong>{ status }</strong> pri učitavanju!</h1>

<p>
    { error.message }
</p>


<style>
    strong {
        color: var(--accent-color);
    }
</style>