    <!-- // ---
    // title: Impressum
    // chapter: 
    // coverImage: 
    // imgRoot: izlozba/impressum/
    // layout: basic
    // --- -->
    <script>
        import Article from '$lib/components/Article.svelte'
        const title = "Impressum"
    </script>

<Article { title }>
    <h1>{ title }</h1>

    <h3>Organizatori izložbe:</h3>
    <ul>
        <li>Gliptoteka HAZU</li>
        <li>Arhiv za likovne umjetnosti HAZU</li>
    </ul>
    <h3>Urednice:</h3>
    <ul>
        <li>Jasenka Ferber Bogdan</li>
        <li>dr. sc. Magdalena Getaldić</li>
    </ul>
    <h3>Autorica koncepta izložbe:</h3>
    <ul>
        <li>dr. sc. Magdalena Getaldić</li>
    </ul>
    <h3>Autorice tekstova:</h3>
    <ul>
        <li>Andreja Der-Hazarijan Vukić</li>
        <li>dr. sc. Magdalena Getaldić</li>
    </ul>
    <h3>Oblikovanje i razvoj virtualne izložbe:</h3>
    <ul>
        <li>Trpimir Jeronim Ježić</li>
    </ul>
    <h3>Fotografije:</h3>
    <ul>
        <li>Arhiv Gliptoteke HAZU</li>
    </ul>

    <blockquote>
       <strong>&#169; Sva prava pridržana.</strong> Niti jedan dio ove publikacije ili njegov dizajn mogu se reproducirati, prenositi ili koristiti u bilo kojem obliku ili bilo kojim sredstvima, elektronskim, mehaničkim, fotokopiranjem, snimanjem ili na drugi način, bez pisanog dopuštenja autora.
    </blockquote>

</Article>

<style>
    h3 {
        margin-bottom: 0;
    }
    ul {
        margin-top: 0;
        margin-bottom: 2rem;
    }
</style>


