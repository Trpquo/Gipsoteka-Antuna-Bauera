import { get } from '../../routes/posts.json.js'

export default async ( ) => {

    let response = null;

    try {
        const posts = await fetch( '/posts.json' )
        const { menu } = await posts.json()
        response = menu 
    }
    catch ({ message }) {
        console.error
    }


    if ( !response ) {
        const { body: { menu } } = await get()
        response = menu

        console.log( "Get in place of fetch!" )
    } else {
        console.log( "Fetch in place of get!" )
    }
    
    return response
}