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