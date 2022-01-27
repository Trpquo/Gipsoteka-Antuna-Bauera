import { get } from '../../routes/posts.json.js'
import { site } from '$lib/utils/stores'

export default async ( fetch ) => {
    console.log("%c🌈 Loading sitemap....", "color: hotpink")
    const key = 'test'
    let response = JSON.parse( localStorage.getItem(key) );

    if ( response && Date.now() > response.expirationDate  ) { 
        console.log('%c📯 Clearing outdated localStorage', "color: goldenrod")
        localStorage.removeItem( key )
        response = null
    }
    
    if ( response ) {
        console.log( "%c🚀LocalStorage in place of remote!", "color: goldenrod" )
        site.set( response )        
        return
    } 
    else {
        console.log( "%c🚁 No data in localStorage. Going remote!", "color: goldenrod" )
    }


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

        console.log( "%c🚚 Get in place of fetch!", "color: magenta" )
    } else {
        console.log( "%c🚛 Fetch in place of get!", "color: lime" )
    }
    
    site.set( response )

    response.expirationDate = Date.now() + 7 * 8.64e+7 // milisekundi u danu * 7 = tjedan
    localStorage.setItem( key, JSON.stringify( response ) )
}