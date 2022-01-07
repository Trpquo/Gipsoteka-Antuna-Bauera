import { get } from '../../routes/posts.json.js'

export default async ( ) => {

    let gotIt = false, response = null;

    try {
        const posts = await fetch( '/posts.json' )
        const { menu } = await posts.json()
        gotIt = true
        response = menu 
    }
    catch ({ message }) {
        console.error
    }


    if ( !gotIt ) {
        const { body } = await get()
        console.log( "Get in place of fetch!" )
        return body
    } else {
        
        console.log( "Fetch in place of get!" )
        return response
    }
    

}