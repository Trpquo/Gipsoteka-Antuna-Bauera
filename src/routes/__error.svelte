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

<Article chapter="(╯°□°）╯︵ ┻━┻" title={ `Greška <strong>${status}</strong> pri učitavanju stranice!` } >
    <h1>Greška <strong>{ status }</strong> pri učitavanju!</h1>
    <h3>
        { error.message.substring( error.message.indexOf( "/" ) ) }
    </h3>
    <h3 style="opacity: .75">
        { error.message.substring( error.message.indexOf( "/" ) ) }
    </h3>
    <h3 style="opacity: .55">
        { error.message.substring( error.message.indexOf( "/" ) ) }
    </h3>
    <h3 style="opacity: .3">
        { error.message.substring( error.message.indexOf( "/" ) ) }
    </h3>
    <h3 style="opacity: .15">
        { error.message.substring( error.message.indexOf( "/" ) ) }
    </h3>
    <h3 style="opacity: .0666">
        { error.message.substring( error.message.indexOf( "/" ) ) }
    </h3>
    <style>
        h6, h6 span {
            font-size: 6rem !important;
            margin: -3rem 4rem 6rem !important;
            letter-spacing: -.15em !important;
        }
        
        @media (max-width: 800px) {
            article h1 {
                text-align: left !important;
            }
            h6 {
                margin-top: 0rem !important;
                margin-bottom: 4rem !important;
                font-size: 3rem !important;
            }
        }
    </style>

</Article>




<style>
    strong {
        color: var(--accent-color);
    }
</style>