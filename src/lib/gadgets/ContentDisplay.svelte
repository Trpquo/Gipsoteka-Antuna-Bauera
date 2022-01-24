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
        <figure>
            {#if coverImage }
            <img src={ `/img/${ imgRoot }${ coverImage }` } alt={ title } />
            {:else}
            <img src={ getImgUrl( imgRoot ? imgRoot : slug ) } alt={ title } />
            {/if}
        </figure>
        <!-- <svelte:self content={{ menu: sub, posts: content.posts, images: content.images }} /> -->
        <ul>
            <h4>
                <a href={ slug } >{ title }</a>
            </h4> 
            {#if sub }
                {#each sub as s }
                    <li>
                        <a href={ s.slug }>{ s.meta.title }</a>
                    </li>
                {/each}
            {/if}
            </ul>
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
        top: -1.2em;
        right: 1rem;
        z-index: 2;
        font-size: clamp(3rem, 7vw, 4rem);
        color: var(--accent-color);
        text-shadow: none;
        letter-spacing: -.1em;
    }
    h4 {
        padding-inline: .5rem;
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
    .content-display > li > ul {
        padding: 0 .25rem 0 .75rem;
    }
    .content-display ul li, h4 {
        float: left;
        clear: both;
    }
    ul ul li {
        margin-top: .15rem;
        border-top: 1px solid var(--text-color-dark);
        padding: .666rem .5rem .333rem;
    }
    ul ul li:first-of-type {
        border-top: none;
    }
    ul ul li a {
        display: block;
        color: var(--text-color-dark);
        font-variant: normal;
    }
    h4 a:hover {
        text-decoration-color: var(--bg-color-light);
        text-decoration-thickness: 3px;
    }
    ul ul li a:hover {
        font-weight: bold;
        text-decoration: none;
        /* color: var(--bg-color-medium); */
    }
    figure {
        width: 100%;
        aspect-ratio: 1/1;
    }
    @media ( max-width: 800px ) {
        .content-display {
           display: block;
        }
        .content-display > li {
            display: grid;
            grid-template-columns: 1fr 2fr;
            height: auto;
            border-top: 0;
            margin-bottom: var(--large-padding);
        }
        .content-display > li:after {
           width: 1rem;
           background-color:  var(--bg-color-light);
           top: 0;
           left: calc( 33% - .75rem );
           height: 100%;
        }
        /* .content-display > li > a {
            display: block;
            width: 100%;
            height: 100%;
            float: left;
        } */

        h3 {
            left: .75rem;
            top: 0;
            line-height: 0;
            font-size: 6rem;
            right: auto;
        }
        h4 {
            border-top: .25rem solid var(--text-color-dark);
            padding-top: 1rem;
            margin-top: 0;
        }
        figure {
            height: 100%;
            /* aspect-ratio: unset; */
        }
        .content-display > li > ul {
            padding-bottom: 0;
        }
    }
</style>