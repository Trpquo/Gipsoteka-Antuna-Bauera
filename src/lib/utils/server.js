import { get } from '../../routes/posts.json.js'
import { site } from '$lib/utils/stores'

export default async ( fetch ) => {
    console.log("%cServer logging in.", "color: hotpink")
    let response = null;

    try {
        const posts = await fetch( '/posts.json' )
        response = await posts.json()
    }
    catch ({ message }) {
        console.error
    }


    if ( !response ) {
        const { body } = await get()
        response = body

        console.log( "%cGet in place of fetch!", "color: magenta" )
    } else {
        console.log( "%cFetch in place of get!", "color: lime" )
    }
    
    site.set( response )
}