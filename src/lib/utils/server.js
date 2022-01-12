import { get } from '../../routes/posts.json.js'
import { site } from '$lib/utils/stores'

export default async ( fetch ) => {

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

        console.log( "Get in place of fetch!" )
    } else {
        console.log( "Fetch in place of get!" )
    }
    
    site.set( response )
}