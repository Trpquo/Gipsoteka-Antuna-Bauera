<script>
    export let content

    // console.log( content.menu )

    function getImgUrl( slug ) {
        const images = content.images.filter( url=> url.indexOf( slug ) > 0  ) 
        // console.log( images )
        const randImg = images[ Math.floor( Math.random() * images.length) ]
        return randImg.substring( randImg.indexOf( '/img/' ) )
    }
</script>

<ul class="content-display" style={ `--fit-chapters: ${ 95 / content.menu.length }%` }>
    {#each content.menu as { slug, sub, meta: { title, imgRoot, coverImage, chapter } }, index }
    <li>
        <h3>{ chapter }</h3>
        <a href={ slug } >
            <figure>
                {#if coverImage }
                <img src={ `/img/${ imgRoot }/${ coverImage }` } alt={ title } />
                {:else}
                <img src={ getImgUrl( imgRoot ? imgRoot : slug ) } alt={ title } />
                {/if}
                <figcaption>
                    <h4>{ title }</h4> 
                </figcaption>
            </figure>
        </a>
        {#if sub }
            <!-- <svelte:self content={{ menu: sub, posts: content.posts, images: content.images }} /> -->
            <ul>
                {#each sub as s }
                    <li>
                        <a href={ s.slug }>{ s.meta.title }</a>
                    </li>
                {/each}
            </ul>
        {/if}
    </li>
    {/each}
</ul>

<style>
    ul {
        list-style: none;
        padding: 0;
    }
    .content-display {
        margin-top: 2rem;
        width: 100%;
        display: grid;
        grid-template-columns: repeat( auto-fit, var(--fit-chapters) );
        gap: .75rem;
        align-items: start;
    }
    .content-display > li {
        border-top: .5rem solid var(--bg-color-light);
        position: relative;
    }
    h3 {
        position: absolute;
        top: -1.15em;
        right: .5rem;
        z-index: 2;
        font-size: clamp(3rem, 8vw, 5rem);
        color: var(--accent-color);
        text-shadow: none;
    }

    .content-display > li:after {
        content: "";
        display: block;
        width: calc( 100% + .25rem );
        height: calc( 100% + .5rem );
        width: .25rem;
        background-color: var(--text-color-dark);
        position: absolute;
        left: -.25rem;
        top: -.5rem;
    }
    /* .content-display > li:hover:after { 
        background-color: var(--bg-light);
        transition: width .5s ease-out, background-color 0 linear .45s;
    } */
    .content-display > li > ul, figcaption {
        padding: 0 .25rem 1rem .75rem;
    }
    figure {
        width: 100%;
        aspect-ratio: 1/1;
    }

    ul ul li {
        margin-top: .15rem;
        border-top: 1px solid var(--text-color-dark);
        padding: .5rem;
    }
    ul ul a {
        display: block;
        color: var(--text-color-dark);
        font-variant: normal;
    }
    ul ul a:hover {
        font-weight: bold;
        /* color: var(--bg-color-medium); */
    }
    @media ( max-width: 800px ) {
        .content-display {
           display: block;
        }
        .content-display > li {
            height: 35vh;
            border-top: 0;
            margin-bottom: var(--large-padding);
        }
        .content-display > li:after {
           width: 1rem;
           background-color:  var(--bg-color-light);
           top: 0;
           height: 100%;
        }
        li > a {
            display: block;
            width: 50%;
            height: 100%;
        }

        h3 {
            left: 1.25rem;
            top: 0;
            line-height: 0;
            font-size: 6rem;
            right: auto;
        }
        figure {
            height: 100%;
            aspect-ratio: unset;
        }
        figcaption {
            position: absolute;
            top: 0;
            right: 0;
            width: 50%;
        }
        .content-display ul {
            width: 50%;
            position: absolute;
            right: 0;
            bottom: 0;
        }
    }
</style>