<script>
    import { tick } from 'svelte'
    import { slide } from 'svelte/transition'
    import GifGadget from '$lib/gadgets/GifGadget.svelte'

    export let src, settings

    let width, height, pdfView, opened = false

    let _PDF_DOC,
        _CURRENT_PAGE,
        _TOTAL_PAGES,
        _PAGE_RENDERING_IN_PROGRESS = 0,
        _CANVAS,
        _CONTAINER;
    
    // initialize and load the PDF
    async function showPDF(pdf_url) {
        await tick()
        pdfView.querySelector(".pdf-loader").style.opacity = 1;
    
        // get handle of pdf document
        try {
            _PDF_DOC = await pdfjsLib.getDocument({ url: pdf_url });
        }
        catch(error) {
            alert(error.message);
        }
    
        // total pages in pdf
        _TOTAL_PAGES = _PDF_DOC.numPages;
        
        // Hide the pdf loader and show pdf container
        pdfView.querySelector(".pdf-loader").style.opacity = 0;
        // pdfView.querySelector(".pdf-contents").style.display = 'flex';
        pdfView.querySelector(".pdf-total-pages").innerHTML = _TOTAL_PAGES;
    
        // show the first page
        showPage(1);
    }
    
    // load and render specific page of the PDF
    async function showPage(page_no) {
        _PAGE_RENDERING_IN_PROGRESS = 1
        _CURRENT_PAGE = page_no
    
        // disable Previous & Next buttons while page is being loaded
        pdfView.querySelector(".pdf-next").disabled = true
        pdfView.querySelector(".pdf-prev").disabled = true
    
        // while page is being rendered hide the canvas and show a loading message
        pdfView.querySelector(".pdf-canvas").style.opacity = 0
        pdfView.querySelector(".page-loader").style.opacity = 1
    
        // update current page
        pdfView.querySelector(".pdf-current-page").innerHTML = page_no
        
        // get handle of page
        try {
            var page = await _PDF_DOC.getPage(page_no)
        }
        catch( { message } ) {
            console.error( message )
        }
    
        // original width of the pdf page at scale 1
        // var original_pdf_width =  page.getViewport(1.0).width

        
        // as the canvas is of a fixed width we need to adjust the scale of the viewport where page is rendered
        var scale_required = 1.0 // _CANVAS.width / original_pdf_width;
        
        
        // get viewport to render the page at required scale
        var viewport =  page.getViewport(scale_required)
        
        // set canvas height same as viewport height
        _CANVAS.width = viewport.width
        _CANVAS.height = viewport.height
        width = viewport.width
        height = viewport.height
        
        
    
        // setting page loader height for smooth experience
        pdfView.querySelector(".page-loader").style.height =  height + 'px';
        pdfView.querySelector(".page-loader").style.lineHeight = height + 'px'
    
        // page is rendered on <canvas> element
        var render_context = {
            canvasContext: _CANVAS.getContext('2d'),
            viewport: viewport
        };
            
        // render the page contents in the canvas
        try {
            await page.render(render_context);
        }
        catch(error) {
            alert(error.message);
        }
    
        _PAGE_RENDERING_IN_PROGRESS = 0;
    
        // re-enable Previous & Next buttons
        document.querySelector(".pdf-next").disabled = false;
        document.querySelector(".pdf-prev").disabled = false;
    
        // show the canvas and hide the page loader
        document.querySelector(".pdf-canvas").style.opacity = 1;
        document.querySelector(".page-loader").style.opacity = 0;
    }



    // click on "Show PDF" buuton
    function openVewer() {
        opened = !opened;
        this.title = opened ? "Zatvori" : "Otvori"

        if ( opened ) {
            setTimeout(()=>{
                try {
                    showPDF( src );
                }
                catch ({ message }) {
                    console.error( message )
                    _CONTAINER.innerHTML = `<iframe class="pdf-iframe" src=${ src } name="${ settings.backup }" title="Iframe Example" seamless></iframe>`
                }
            }, 1000)
        }

    }    
    
    // click on the "Previous" page button
    function previousPage() {
        if(_CURRENT_PAGE != 1)
            showPage(--_CURRENT_PAGE);
    }
    // click on the "Next" page button
    function nextPage() {
        if(_CURRENT_PAGE != _TOTAL_PAGES)
            showPage(++_CURRENT_PAGE);
    }

    
    
</script>
<svelte:head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.228/pdf.min.js"></script>
</svelte:head>



<div class="pdf-view" class:opened bind:this={ pdfView } style={ `
    --ratio: ${ Math.floor( width / 100 ) }/${ Math.floor( height / 100 ) }; 
    --width: ${ width }px; --height: ${ height }px;
    --brightness: ${ settings.brightness };
    --contrast: ${ settings.contrast };
    ` }  >

    <button class="show-pdf-button"  on:click={ openVewer } title="Otvori">
        <GifGadget src="/icons/icons8-pdf.gif" />
        <span>PDF</span>
    </button> 

    {#if opened }
    <div class="pdf-main-container" bind:this={ _CONTAINER } transition:slide={{ duration: 1000 }}>
        <div class="pdf-loader">Učitavam dokument...</div>
        <div class="pdf-contents">
            <div class="pdf-meta">
                <div class="pdf-buttons">
                    <button class="pdf-prev" title="prethodna" on:click={ previousPage } >Prev</button>
                    <button class="pdf-next" title="iduća" on:click={ nextPage }>Next</button>
                </div>
                <div class="page-count-container"><strong>p.</strong> <div class="pdf-current-page"></div> / <div class="pdf-total-pages"></div></div>
            </div>
            <canvas class="pdf-canvas" bind:this={ _CANVAS }></canvas>
            <div class="page-loader">Učitavam stranicu...</div>
        </div>
    </div>
    {/if}
</div>


<style type="text/css">

    .pdf-view {
        font-family: var(--text-face);
    }
    
    .show-pdf-button {
        background-color: transparent;
        margin-left: -.75rem;
        width: 70px;
        float: left;
    }
    .show-pdf-button span {
        line-height: 1em; 
    }
    
    .pdf-main-container {
        margin-inline: auto;
        margin-top: 0;
        margin-bottom: 1rem;
    }
    
    @media ( max-width: 800px ) {
        .pdf-main-container {
            clear: both;
            width: calc( 100% + var(--large-padding) * 2 );
            margin-left: calc( var(--large-padding) * -1 );
        }

        :global(.textContent .footnotes .pdf-main-container) {
            margin-left: calc( ( var(--large-padding) + var(--default-padding) ) * -1.18  );
            margin-top: 2rem;
        }
    }
    
    .pdf-contents {
        display: flex;
        border-top: 1rem solid var(--bg-color-light);
        flex-direction: column-reverse;
        height: 90vh;
        background-color: var(--bg-dark);
        position: relative;
    }

    .pdf-canvas {
        box-sizing: border-box;
        height: 100%;
        aspect-ratio: var(--ratio);
        object-fit: contain;
        filter: contrast( var(--contrast) ) brightness( var(--brightness) ) saturate(.2) ;
        transition: opacity .5s ease-out;
    }
    
    .pdf-meta {
        overflow: hidden;
        background-color: var(--bg-color-light);
        padding: var(--default-padding);
        color: var(--text-color-light);
    }
    
    .pdf-buttons {
        float: left;
    }
    .pdf-buttons button {
        background-color: transparent;
        text-indent: -99999px;
        position: relative;
        width: 2rem;
        height: 2rem;
        margin-right: .5rem;
    }
    .pdf-next:before, .pdf-prev:before {
        content: "";
        display: block;
        position: absolute;
        inset: .5rem;
        
        transform: rotate(45deg);
        border-style: solid;
        border-color: var(--bg-dark);
        border-width: .25rem .25rem 0 0; 
    }
    .pdf-prev:before {
        border-width: 0 0 .25rem .25rem;
    }
    .pdf-buttons button:hover:before {
        border-color: var(--bg-color-dark);
    }
    
    .page-count-container {
        float: right;
    }
    .page-count-container div {
        font-size: 1.2em;
        color: var(--bg-dark);
    }
    
    .pdf-current-page {
        display: inline;
    }
    
    .pdf-total-pages {
        display: inline;
    }

    .pdf-loader , .page-loader {
        position: absolute;
        inset: 0;
        height: 0;
        line-height: 100%;
        text-align: center;
        color: var(--bg-color-light);
        font-size: var(--text-size);
        background-color: var(--bg-dark);
        opacity: 0;
        /* transition: opacity .25s ease-out; */
    }

    
    </style>